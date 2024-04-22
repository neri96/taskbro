import { ComponentType, useState } from "react";

import styles from "./styles.module.scss";

interface IProps {
  wizardStyle: { minWidth: string };
  handleNext: () => void;
  handlePrev: () => void;
}

const Wizard = ({ components }: { components: ComponentType<IProps>[] }) => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  return (
    <div
      className={styles.wizard}
      style={{ transform: `translateX(${-100 * currentStep}%)` }}
    >
      {components.map((Component: ComponentType<IProps>) => {
        return (
          <Component
            wizardStyle={{ minWidth: "100%" }}
            handleNext={() => setCurrentStep((currentStep) => currentStep + 1)}
            handlePrev={() => setCurrentStep((currentStep) => currentStep - 1)}
          />
        );
      })}
    </div>
  );
};

export default Wizard;
