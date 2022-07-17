import { Action } from "history";
import {
  PropsWithChildren,
  ReactElement,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useReducer,
} from "react";

type Step = {
  id: string;
  path: string;
  title: string;
  subtitle: string;
  onNext: (() => boolean) | null;
};

type StateDefinition = {
  activeStepIndex: number;
  steps: Step[];
};

// ---

export enum ActionTypes {
  NextStep,
  PreviousStep,
  GoToStep,
  RegisterStep,
  UnregisterStep,
}

export type Actions =
  | { type: ActionTypes.NextStep }
  | { type: ActionTypes.PreviousStep }
  | { type: ActionTypes.GoToStep; index: number }
  | { type: ActionTypes.RegisterStep; step: Step }
  | { type: ActionTypes.UnregisterStep; id: Step["id"] };

const reducers: {
  [P in ActionTypes]: (
    state: StateDefinition,
    action: Extract<Actions, { type: P }>
  ) => StateDefinition;
} = {
  [ActionTypes.NextStep](state) {
    const newIndex = state.activeStepIndex + 1;
    if (newIndex < state.steps.length) {
      return { ...state, activeStepIndex: newIndex };
    }
    return state;
  },
  [ActionTypes.PreviousStep](state) {
    if (state.activeStepIndex > 0) {
      return { ...state, activeStepIndex: state.activeStepIndex - 1 };
    }
    return state;
  },
  [ActionTypes.GoToStep]: (state, action) => {
    // console.log("[ActionTypes.GoToStep]", action.index);

    return { ...state, activeStepIndex: action.index };
  },
  [ActionTypes.RegisterStep]: (state, action) => {
    const steps = [...state.steps, action.step];

    console.log("[ActionTypes.RegisterStep]", action.step);
    console.log("[ActionTypes.RegisterStep]", steps);

    return { ...state, steps };
  },
  [ActionTypes.UnregisterStep]: (state, action) => {
    const steps = state.steps.slice();

    console.log("[ActionTypes.UnregisterStep]", action.id);
    console.log("[ActionTypes.UnregisterStep]", steps);

    const idx = state.steps.findIndex((step) => step.id === action.id);
    if (idx === -1) return state;
    steps.splice(idx, 1);
    return { ...state, steps };
  },
};

const stateReducer = (state: StateDefinition, action: Actions) => {
  const returnValue = reducers[action.type];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return returnValue(state, action as Actions & any);
};

// ---

type WizardContextType = {
  // /**
  //  * Go to the next step
  //  */
  // nextStep: () => Promise<void>;
  // /**
  //  * Go to the previous step
  //  */
  // previousStep: () => void;
  // /**
  //  * Go to the given step index
  //  *
  //  * @param stepIndex The step index, starts at 0
  //  */
  // goToStep: (stepIndex: number) => void;
  // /**
  //  * Attach a callback that will be called when calling `nextStep()`
  //  *
  //  * @param handler Can be either sync or async
  //  */
  // handleStep: (handler: Handler) => void;
  // /**
  //  * Indicate the current state of the handler
  //  *
  //  * Will reflect the handler promise state: will be `true` if the handler promise is pending and
  //  * `false` when the handler is either fulfilled or rejected
  //  */
  // isLoading: boolean;
  // /** The current active step of the wizard */
  // /** The total number of steps of the wizard */
  // /** Indicate if the current step is the first step (aka no previous step) */
  // isFirstStep: boolean;
  // /** Indicate if the current step is the last step (aka no next step) */
  // isLastStep: boolean;
  stepCount: number;
  activeStep: Step | null;
  activeStepId: string | null;
  activeStepIndex: number;
  hasNextStep: boolean;
  hasPreviousStep: boolean;
  registerOption: (step: Step) => () => void;
  doNextStep: () => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
};

const WizardContext = createContext<WizardContextType | null>(null);

export const useWizardContext = (component: string) => {
  const context = useContext(WizardContext);
  if (context === null) {
    const err = new Error(
      `<${component} /> is missing a parent <Wizard /> component.`
    );
    if (Error.captureStackTrace) Error.captureStackTrace(err, useWizardContext);
    throw err;
  }
  return context;
};

// ---

// const useLatestValue = <T,>(value: T) => {
//   const cache = useRef(value);

//   useEffect(() => {
//     cache.current = value;
//   }, [value]);

//   return cache;
// };

// const useEvent = <
//   F extends (...args: any[]) => any,
//   P extends any[] = Parameters<F>,
//   R = ReturnType<F>
// >(
//   cb: (...args: P) => R
// ) => {
//   const cache = useLatestValue(cb);
//   return useCallback((...args: P) => cache.current(...args), [cache]);
// };

const WizardRoot: React.FunctionComponent<PropsWithChildren> = (props) => {
  // console.log("[Wizard]", props);

  const [state, dispatch] = useReducer(stateReducer, {
    activeStepIndex: 0,
    steps: [],
  } as StateDefinition);

  const registerOption = useCallback((step: Step) => {
    dispatch({ type: ActionTypes.RegisterStep, step });
    return () => dispatch({ type: ActionTypes.UnregisterStep, id: step.id });
  }, []);

  const activeStep = useMemo(() => {
    console.log(state.steps.length !== 0);
    return state.steps.length !== 0 ? state.steps[state.activeStepIndex] : null;
  }, [state.activeStepIndex, state.steps]);

  const activeStepId = useMemo(() => {
    return state.steps.length !== 0
      ? state.steps[state.activeStepIndex].id
      : null;
  }, [state.activeStepIndex, state.steps]);

  const hasNextStep = state.activeStepIndex < state.steps.length - 1;
  const hasPreviousStep = state.activeStepIndex > 0;

  const goToNextStep = useCallback(() => {
    console.log("goToNextStep");

    if (hasNextStep) {
      dispatch({ type: ActionTypes.NextStep });
    }
  }, [hasNextStep]);

  const goToPreviousStep = useCallback(() => {
    if (hasPreviousStep) {
      // nextStepHandler.current = null;
      dispatch({ type: ActionTypes.PreviousStep });
    }
  }, [hasPreviousStep]);

  const doNextStep = () => {
    console.log("doNextStep", "!!!");

    console.log("doNextStep", state.steps);
    console.log("doNextStep", state.activeStepIndex);

    if (activeStep && activeStep.onNext) {
      if (activeStep.onNext()) {
        goToNextStep();
      }
    }

    // if (hasNextStep.current && nextStepHandler.current) {
    //   try {
    //     setIsLoading(true);
    //     await nextStepHandler.current();
    //     setIsLoading(false);
    //     nextStepHandler.current = null;
    //     goToNextStep.current();
    //   } catch (error) {
    //     setIsLoading(false);
    //     throw error;
    //   }
    // } else {
    //   goToNextStep.current();
    // }
  };

  const api: WizardContextType = {
    registerOption,
    activeStep,
    activeStepId,
    activeStepIndex: state.activeStepIndex,
    stepCount: state.steps.length,
    hasNextStep,
    hasPreviousStep,
    doNextStep,
    goToNextStep,
    goToPreviousStep,
  };

  // console.log("[Wizard]", "Rendered!");
  // console.log(" ├─", "hasNextStep", hasNextStep);
  // console.log(" ├─", "hasPreviousStep", hasPreviousStep);
  // console.log(" ├─", "goToNextStep", goToNextStep);
  // console.log(" ├─", "goToPreviousStep", goToPreviousStep);
  // console.log(" └─", "api", api);

  return (
    <WizardContext.Provider value={api}>
      {props.children}
    </WizardContext.Provider>
  );
};

// ---

type StepRenderPropArg = {
  isActive: boolean;
};

type StepProps = {
  path: string;
  title: string;
  subtitle: string;
  onNext: (() => boolean) | null;
  children?: ReactNode | ((props: StepRenderPropArg) => ReactElement);
};

const Step: React.FunctionComponent<StepProps> = ({
  children,
  path,
  title,
  subtitle,
  onNext,
  ...props
}) => {
  // console.log("[Wizard.Step]", props);

  const id = useId();

  // const [{ activeStepIndex, steps }, dispatch] =
  //   useWizardContext("Wizard.Step");

  const { registerOption, activeStepId } = useWizardContext("Wizard.Step");

  // useEffect(() => {
  //   console.log("[Wizard.Step]", "Registering step...");

  //   dispatch({
  //     type: ActionTypes.RegisterStep,
  //     step: { id, path, title, subtitle },
  //   });
  //   return () => dispatch({ type: ActionTypes.UnregisterStep, id });
  // }, [id, path, title, subtitle, dispatch]);

  const slot = useMemo<StepRenderPropArg>(() => {
    return { isActive: activeStepId ? activeStepId === id : false };
  }, [id, activeStepId]);

  useEffect(
    () => registerOption({ id, path, title, subtitle, onNext }),
    [id, registerOption, path, title, subtitle, onNext]
  );

  const resolvedChildren = (
    typeof children === "function" ? children(slot) : children
  ) as ReactElement | ReactElement[];

  return <>{resolvedChildren}</>;
};

// ---

type ProgressRenderPropArg = {
  progress: number;
};

const Progress: React.FunctionComponent<{
  children?: ReactNode | ((props: ProgressRenderPropArg) => ReactElement);
}> = ({ children, ...props }) => {
  // console.log("[Wizard.Progress]", props);

  // const [{ activeStepIndex, steps }] = useWizardContext("Wizard.Progress");
  const { stepCount, activeStepIndex } = useWizardContext("Wizard.Progress");

  const slot = useMemo<ProgressRenderPropArg>(
    () => ({ progress: ((activeStepIndex + 1) / stepCount) * 100 }),
    [activeStepIndex, stepCount]
  );

  // useEffect(() => {
  //   console.log("[Wizard.Progress]", slot.progress);
  // }, [slot.progress]);

  const resolvedChildren = (
    typeof children === "function" ? children(slot) : children
  ) as ReactElement | ReactElement[];

  return <>{resolvedChildren}</>;
};

// ---

type InfoRenderPropArg = {
  title: string;
  subtitle: string;
};

const Info: React.FunctionComponent<{
  children?: ReactNode | ((props: InfoRenderPropArg) => ReactElement);
}> = ({ children, ...props }) => {
  // console.log("[Wizard.Info]", props);

  // const [state] = useWizardContext("Wizard.Info");
  const { activeStep } = useWizardContext("Wizard.Info");

  const slot = useMemo<InfoRenderPropArg>(() => {
    if (!activeStep) {
      return { title: "null", subtitle: "null" };
    } else {
      return { title: activeStep.title, subtitle: activeStep.subtitle };
    }
  }, [activeStep]);

  const resolvedChildren = (
    typeof children === "function" ? children(slot) : children
  ) as ReactElement | ReactElement[];

  return <>{resolvedChildren}</>;
};

// ---

type NavigationRenderPropArg = {
  onNext: VoidFunction;
  onPrevious: VoidFunction;
  hasNextStep: boolean;
  hasPreviousStep: boolean;
};

const Navigation: React.FunctionComponent<{
  children?: ReactNode | ((props: NavigationRenderPropArg) => ReactElement);
}> = ({ children, ...props }) => {
  // console.log("[Wizard.Navigation]", props);

  // const [, dispatch] = useWizardContext("Wizard.Navigation");
  const {
    doNextStep,
    goToNextStep,
    goToPreviousStep,
    hasNextStep,
    hasPreviousStep,
  } = useWizardContext("Wizard.Navigation");

  const slot = useMemo<NavigationRenderPropArg>(() => {
    const onNext = () => {
      // dispatch({ type: ActionTypes.NextStep });
      doNextStep();
      // goToNextStep();
      console.log("[Wizard.Navigation]", "onNext");
    };

    const onPrevious = () => {
      // dispatch({ type: ActionTypes.PreviousStep });
      goToPreviousStep();
      console.log("[Wizard.Navigation]", "onPrevious");
    };

    return { onNext, onPrevious, hasNextStep, hasPreviousStep };
  }, [hasNextStep, hasPreviousStep, doNextStep, goToPreviousStep]);

  const resolvedChildren = (
    typeof children === "function" ? children(slot) : children
  ) as ReactElement | ReactElement[];

  return <>{resolvedChildren}</>;
};

// ---

export const Wizard = Object.assign(WizardRoot, {
  Step,
  Progress,
  Navigation,
  Info,
});
