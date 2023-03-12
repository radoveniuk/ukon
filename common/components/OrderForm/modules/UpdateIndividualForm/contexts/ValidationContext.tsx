import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useEffect, useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';


const ValidationContext = createContext<boolean>(false);

const ValidationProvider = ({ children }: PropsWithChildren) => {
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

  }, []);

  return (
    <ValidationContext.Provider value={false}>
      {children}
    </ValidationContext.Provider>
  );
};

export default ValidationProvider;

export const useValidation = () => {
  const context = useContext(ValidationContext);
  return context;
};
