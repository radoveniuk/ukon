import { createContext, Dispatch, PropsWithChildren, SetStateAction, useCallback, useContext, useState } from 'react';

type ContextType = {
  base: number,
  mainActivity: number,
  otherActivities: number,
  citizenship: number,
  residence: number,
  vAddressTariff: number,
}

const PriceContext = createContext<[ContextType, Dispatch<SetStateAction<ContextType>>] | undefined>(undefined);

const PriceProvider = ({ children }: PropsWithChildren) => {
  const priceState = useState({
    base: 19,
    mainActivity: 0,
    otherActivities: 0,
    citizenship: 0,
    residence: 0,
    vAddressTariff: 0,
  });

  return (
    <PriceContext.Provider value={priceState}>
      {children}
    </PriceContext.Provider>
  );
};

export default PriceProvider;

export const usePriceContext = () => {
  const context = useContext(PriceContext);
  if (!context) {
    throw new Error('Context not connect');
  }
  const [priceList, setPriceList] = context;
  const updatePriceList = useCallback(
    (update: Partial<ContextType>) => {
      setPriceList((prev) => ({
        ...prev,
        ...update,
      }));
    },
    [setPriceList],
  );
  return [priceList, updatePriceList] as [ContextType, (v: Partial<ContextType>) => void];
};