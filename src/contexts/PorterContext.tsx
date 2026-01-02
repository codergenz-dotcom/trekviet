import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface PorterContextType {
  isPorter: boolean;
  setIsPorter: (value: boolean) => void;
  registerAsPorter: () => void;
}

const PorterContext = createContext<PorterContextType | undefined>(undefined);

export function PorterProvider({ children }: { children: ReactNode }) {
  const [isPorter, setIsPorter] = useState(() => {
    const saved = localStorage.getItem('isPorter');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isPorter', String(isPorter));
  }, [isPorter]);

  const registerAsPorter = () => {
    setIsPorter(true);
  };

  return (
    <PorterContext.Provider value={{ isPorter, setIsPorter, registerAsPorter }}>
      {children}
    </PorterContext.Provider>
  );
}

export function usePorter() {
  const context = useContext(PorterContext);
  if (context === undefined) {
    throw new Error('usePorter must be used within a PorterProvider');
  }
  return context;
}
