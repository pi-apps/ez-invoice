import { createContext, useState } from "react";

type InvoiceIdContextType = {
  id?: string;
  code?: string;
};

export type InVoiceIdContextType = {
  invoiceId: any;
  setInvoiceId: any;
};

type LangaugesContextProviderType = {
  children: React.ReactNode;
};

export const InvoiceIdContext = createContext({} as InVoiceIdContextType);

export const InVoiceIdContextProvider = ({
  children,
}: LangaugesContextProviderType) => {
  const [invoiceId, setInvoiceId] = useState<any>(null);
  return (
    <InvoiceIdContext.Provider value={{ invoiceId, setInvoiceId }}>
      {children}
    </InvoiceIdContext.Provider>
  );
};
