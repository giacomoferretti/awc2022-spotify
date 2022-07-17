import { ReactNode, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import NoMatch from "@/pages/NoMatch";

type UseWizardPageParams = {
  stepId: string;
};

export const WizardRouter = ({ children }: { children: ReactNode }) => {
  const { stepId } = useParams<
    keyof UseWizardPageParams
  >() as UseWizardPageParams;
  const navigate = useNavigate();

  const [valid, setValid] = useState(true);

  // const [state, dispatch] = useWizardContext("WizardRouter");

  // useEffect(() => {
  //   if (state.steps.length === 0) return;

  //   if (!stepId) {
  //     navigate(state.steps[0].path, { replace: true });
  //     return;
  //   }

  //   const index = state.steps.findIndex((step) => step.path === stepId);
  //   if (index === -1) {
  //     setValid(false);
  //     return;
  //   }

  //   // dispatch({ type: ActionTypes.GoToStep, index });
  // }, [state, navigate, stepId, dispatch]);

  return valid ? <>{children}</> : <NoMatch />;
};
