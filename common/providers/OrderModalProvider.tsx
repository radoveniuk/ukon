import { createContext, Dispatch, PropsWithChildren, SetStateAction, useContext, useState } from 'react';

const OrderModalContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>]>([false, () => {}]);

export default function OrderModalProvider ({ children }: PropsWithChildren) {
  const openState = useState(false);
  return (
    <OrderModalContext.Provider value={openState}>{children}</OrderModalContext.Provider>
  );
};

export const useOrderModalOpen = () => {
  const context = useContext(OrderModalContext);
  if (!context) throw new Error('Order modal not work!');
  return context;
};