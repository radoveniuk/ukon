import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { useSteps } from './StepsContext';


const ValidationContext = createContext<boolean>(false);

const ValidationProvider = ({ children }: PropsWithChildren) => {
  const { step } = useSteps();
  const { watch } = useFormContext();

  const {
    // 0 step requires
    mainActivity, citizenship, residence,
    // 1 step requires
    name, surname, physicalNumber, birthdate, docNumber, street, houseRegNumber, houseNumber, city, zip,
    // 2 step requires
    correctData, agreeWithRules,
  } = watch();

  const isValid = useMemo(() => {
    if (step === 0) {
      return !!mainActivity && !!citizenship && !!residence;
    }
    if (step === 1) {
      return [name, surname, physicalNumber, birthdate, docNumber, street, houseRegNumber, houseNumber, city, zip, residence].every(item => !!item);
    }
    if (step === 2) {
      return [correctData, agreeWithRules].every(item => !!item);
    }
    return false;
  }, [step, mainActivity, citizenship, residence, name, surname, physicalNumber, birthdate, docNumber, street, houseRegNumber, houseNumber, city, zip, correctData, agreeWithRules]);

  return (
    <ValidationContext.Provider value={isValid}>
      {children}
    </ValidationContext.Provider>
  );
};

export default ValidationProvider;

export const useValidation = () => {
  const context = useContext(ValidationContext);
  return context;
};
