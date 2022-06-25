import classNames from "classnames";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useUsers } from "@/context";
import { Button } from "@/design/Button";
import { NoMatch } from "@/pages";
import { OnboardingProvider, Stepper } from "@/pages/Onboarding";

import { steps } from "./steps";

export const Progress = ({ progress }: { progress: number }) => {
  return (
    <div className="h-1.5 w-full rounded-full bg-neutral-700">
      <div
        className="h-1.5 rounded-full bg-spotify-accent-base"
        style={{ width: `${progress}%` }}></div>
    </div>
  );
};

const OnboardingReal = ({ step }: { step: number }) => {
  // const [activeStep, setActiveStep] = useState(step);

  // const nextPage = () => {
  //   setActiveStep((activeStep) => activeStep + 1);
  // };

  // const previousPage = () => {
  //   setActiveStep((activeStep) => activeStep - 1);
  // };

  const { getCurrentUser, updateOnboarding } = useUsers();

  const user = getCurrentUser()!;

  const stepPath = step + 1;

  const navigate = useNavigate();

  const nextPage = () => {
    navigate(`../step${stepPath + 1}`);
  };

  const previousPage = () => {
    navigate(`../step${stepPath - 1}`);
  };

  const finish = () => {
    updateOnboarding(user.username, false);
    navigate("/dashboard");
  };

  const Step = steps[step];

  return (
    <OnboardingProvider>
      <Stepper>
        <div className="mx-auto flex min-h-full w-full max-w-2xl flex-col px-4 py-8 sm:py-32">
          {/* Progress */}
          <Progress progress={((step + 1) / steps.length) * 100} />

          {/* Header */}
          <div className="my-8">
            <h2 className="text-2xl font-bold">{Step.title}</h2>
            <h3>{Step.subtitle}</h3>
          </div>

          <div className="flex-1">
            <React.Suspense
              fallback={<h1 className="text-4xl font-bold">LOADING...</h1>}>
              <Step.Component />
            </React.Suspense>
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <Button
              variant="secondary"
              className={classNames({ invisible: step === 0 })}
              disabled={step === 0}
              onClick={previousPage}>
              Indietro
            </Button>

            <div className="flex items-center justify-end">
              {/* <Button
                variant="tertiary"
                className={classNames({
                  invisible: activeStep === steps - 1,
                })}
                onClick={nextPage}>
                Skip
              </Button> */}

              {step !== steps.length - 1 ? (
                <Button variant="primary" onClick={nextPage}>
                  Avanti
                </Button>
              ) : (
                <Button variant="primary" onClick={finish}>
                  Fine
                </Button>
              )}
            </div>
          </div>
        </div>
      </Stepper>
    </OnboardingProvider>
  );
};

type OnboardingParams = {
  stepId: string;
};

export const Onboarding = () => {
  const params = useParams<OnboardingParams>();

  if (
    !params.stepId ||
    !/^\d+$/.test(params.stepId) ||
    parseInt(params.stepId) - 1 < 0 ||
    parseInt(params.stepId) > steps.length
  ) {
    return <NoMatch />;
  } else {
    return <OnboardingReal step={parseInt(params.stepId) - 1} />;
  }
};
