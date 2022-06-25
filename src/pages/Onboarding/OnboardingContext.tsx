import { createContext, useContext, useState } from "react";

import { useLocalStorage } from "@/hooks/useLocalStorage";

type OnboardingContextType = {
  step1Answered: boolean;
  step2Answered: boolean;
  step3Answered: boolean;
  setStep1Answered: React.Dispatch<React.SetStateAction<boolean>>;
  setStep2Answered: React.Dispatch<React.SetStateAction<boolean>>;
  setStep3Answered: React.Dispatch<React.SetStateAction<boolean>>;
  finished: boolean;
  setFinished: React.Dispatch<React.SetStateAction<boolean>>;
};

const OnboardingContext = createContext<OnboardingContextType>(
  {} as OnboardingContextType
);

export const OnboardingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const onboarding = useProvideOnboarding();

  return (
    <OnboardingContext.Provider value={onboarding}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  return useContext(OnboardingContext);
};

const LS_KEYS = {
  ONBOARDING: "ONBOARDING",
};

const useProvideOnboarding = (): OnboardingContextType => {
  const [step1Answered, setStep1Answered] = useState(false);
  const [step2Answered, setStep2Answered] = useState(false);
  const [step3Answered, setStep3Answered] = useState(false);
  const [finished, setFinished] = useState(false);
  // const [stepData, setStepData] = useState({
  //   step1: {
  //     state: { country: 0, capital: 0 },
  //     solved: false,
  //   },
  //   step2: {
  //     state: { country: 0, capital: 0 },
  //     solved: false,
  //   },
  //   step3: {
  //     state: { citizens: 0, age: 0 },
  //     solved: false,
  //   },
  // });

  return {
    step1Answered,
    step2Answered,
    step3Answered,
    setStep1Answered,
    setStep2Answered,
    setStep3Answered,
    finished,
    setFinished,
    // stepData,
    // setStepData,
  };
};
