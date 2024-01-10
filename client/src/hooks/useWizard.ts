import { useState } from "react";

const useWizard = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const handlePrev = () => setCurrentStep((currentStep) => currentStep - 1);
  const handleNext = () => setCurrentStep((currentStep) => currentStep + 1);

  return {
    parentStyle: {
      display: "flex",
      width: "100%",
      transition: "300ms",
      transform: `translateX(${-100 * currentStep}%)`,
    },
    childrenStyle: { minWidth: "100%" },
    currentStep,
    handlePrev,
    handleNext,
  };
};

export default useWizard;
