import classNames from "classnames";
import { ReactNode, useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { Button } from "@/components/Button/Button";
import { NoMatch } from "@/pages";

import BaseButton from "../Button/BaseButton";
import ButtonOutline from "../Button/ButtonOutline";
import ButtonSolid from "../Button/ButtonSolid";
import { ErrorFallback } from "../ErrorFallback";
import { ArtistsSelection } from "./ArtistsSelection";
import { GenresSelection } from "./GenresSelection";
import { UserPreview } from "./UserPreview";
import { ActionTypes, Wizard, useWizardContext } from "./wizard";

type UseWizardPageParams = {
  stepId: string;
};

const Progress = ({ progress }: { progress: number }) => {
  return (
    <div className="h-1.5 w-full rounded-full bg-neutral-700">
      <div
        className="h-1.5 rounded-full bg-spotify-accent-base transition-[width] duration-500"
        style={{ width: `${progress}%` }}></div>
    </div>
  );
};

const WizardRouter = ({ children }: { children: ReactNode }) => {
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

const WizardNavigation = ({
  onPrevious,
  onNext,
  hasNextStep,
  hasPreviousStep,
}: {
  onPrevious: VoidFunction;
  onNext: VoidFunction;
  hasNextStep: boolean;
  hasPreviousStep: boolean;
}) => {
  return (
    <div className="mt-8 flex items-center justify-between">
      <ButtonOutline
        variant="primary"
        shape="rounded"
        className={classNames({ invisible: !hasPreviousStep })}
        disabled={!hasPreviousStep}
        onClick={onPrevious}>
        Indietro
      </ButtonOutline>

      <div className="flex items-center justify-end">
        <ButtonSolid variant="primary" shape="rounded" onClick={onNext}>
          {hasNextStep ? "Avanti" : "Fine"}
        </ButtonSolid>
      </div>
    </div>
  );
};

export const UseWizard = () => {
  // const { stepId } = useParams<
  //   keyof UseWizardPageParams
  // >() as UseWizardPageParams;
  // const location = useLocation();

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Wizard>
        <WizardRouter>
          <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col px-4 py-8 sm:py-32">
            <Wizard.Progress>
              {({ progress }) => <Progress progress={Math.floor(progress)} />}
            </Wizard.Progress>

            <Wizard.Info>
              {({ title, subtitle }) => (
                <div className="my-8">
                  <h2 className="text-2xl font-bold">{title}</h2>
                  <h3>{subtitle}</h3>
                </div>
              )}
            </Wizard.Info>

            <div className="flex-1">
              <Wizard.Step
                path="step1"
                title="Chi è il tuo preferito?"
                subtitle="Cerca i tuoi artisti preferiti!"
                onNext={() => true}>
                {({ isActive }) => <ArtistsSelection isActive={isActive} />}
              </Wizard.Step>
              <Wizard.Step
                path="step3"
                title="Personalizza il tuo profilo"
                subtitle="Ecco il tuo profilo! Puoi personalizzare il tuo nome e la tua foto profilo."
                onNext={() => true}>
                {({ isActive }) => (
                  <UserPreview isActive={isActive} onFinish={() => false} />
                )}
              </Wizard.Step>
              <Wizard.Step
                path="step2"
                title="Cosa ascolti di più?"
                subtitle="Seleziona i tuoi generi preferiti"
                onNext={() => true}>
                {({ isActive }) => <GenresSelection isActive={isActive} />}
              </Wizard.Step>
            </div>

            <Wizard.Navigation>
              {({ onNext, onPrevious, hasPreviousStep, hasNextStep }) => (
                <WizardNavigation
                  onPrevious={onPrevious}
                  onNext={onNext}
                  hasPreviousStep={hasPreviousStep}
                  hasNextStep={hasNextStep}
                />
              )}
            </Wizard.Navigation>
          </div>
        </WizardRouter>
      </Wizard>
    </ErrorBoundary>
  );
};
