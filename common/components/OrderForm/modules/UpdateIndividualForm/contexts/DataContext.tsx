import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react';

import { CorporateBody } from 'common/components/OrderForm/types';

type ContextType = [CorporateBody | null, Dispatch<SetStateAction<CorporateBody | null>>];

const DataContext = createContext<ContextType | undefined>(undefined);

const DataProvider = ({ children }: PropsWithChildren) => {
  const individualDataState = useState<CorporateBody | null>(null);
  return (
    <DataContext.Provider value={individualDataState as ContextType}>
      {children}
    </DataContext.Provider>
  );
};

export default DataProvider;

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('Data context not connected');
  }
  return context;
};
