import classNames from "classnames";

import ButtonOutline from "@/components/Button/ButtonOutline";
import ButtonSolid from "@/components/Button/ButtonSolid";

export const WizardNavigation = ({
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
