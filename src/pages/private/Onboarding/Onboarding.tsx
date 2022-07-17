import { useNavigate } from "react-router-dom";

import { Wizard } from "@/components/UseWizard/wizard";

import { ArtistsSelection } from "./ArtistsSelection";
import { GenresSelection } from "./GenresSelection";
import { Progress } from "./Progress";
import { UserPreview } from "./UserPreview";
import { WizardNavigation } from "./WizardNavigation";
import { WizardRouter } from "./WizardRouter";

const Onboarding = () => {
  const navigate = useNavigate();

  const onFinish = () => {
    navigate("/dashboard");
  };

  return (
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
              path="step2"
              title="Cosa ascolti di più?"
              subtitle="Seleziona i tuoi generi preferiti"
              onNext={() => true}>
              {({ isActive }) => <GenresSelection isActive={isActive} />}
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
          </div>

          <Wizard.Navigation>
            {({ onNext, onPrevious, hasPreviousStep, hasNextStep }) => (
              <WizardNavigation
                onPrevious={onPrevious}
                onNext={hasNextStep ? onNext : onFinish}
                hasPreviousStep={hasPreviousStep}
                hasNextStep={hasNextStep}
              />
            )}
          </Wizard.Navigation>
        </div>
      </WizardRouter>
    </Wizard>
  );
};

export default Onboarding;
