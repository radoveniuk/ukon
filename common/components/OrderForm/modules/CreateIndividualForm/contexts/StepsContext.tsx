import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react';


const StepsContext = createContext<[number, Dispatch<SetStateAction<number>>] | undefined>(undefined);

const StepsProvider = ({ children }: PropsWithChildren) => {
  const stepsState = useState(0);

  return (
    <StepsContext.Provider value={stepsState}>
      {children}
    </StepsContext.Provider>
  );
};

export default StepsProvider;

export const STEPS = 3;

export const useSteps = () => {
  const context = useContext(StepsContext);
  if (!context) {
    throw new Error('Context not connect');
  }
  const [step, setStep] = context;

  return {
    step,
    setStep,
    nextStep: () => {
      document.getElementsByTagName('main')[0].scrollTo(0, 0);
      setStep(prev => prev + 1 !== STEPS ? prev + 1 : prev);
    },
    prevStep: () => void setStep(prev => prev !== 0 ? prev - 1 : prev),
  };
};
