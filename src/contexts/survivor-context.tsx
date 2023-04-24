import { SurvivorProps } from '@/types/survivor.types';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

interface SurvivorContextInterface {
  survivor: SurvivorProps;
  // eslint-disable-next-line no-unused-vars
  select: (survivor: SurvivorProps) => void;
}

const SurvivorContext = createContext<SurvivorContextInterface>(
  {} as SurvivorContextInterface
);

export function SurvivorProvider({ children }: { children: any }) {
  const [data, setData] = useState<SurvivorProps>({} as SurvivorProps);

  const select = useCallback((survivor: SurvivorProps) => {
    setData(survivor);
  }, []);

  const value = useMemo(
    (): SurvivorContextInterface => ({
      survivor: data,
      select,
    }),
    [data, select]
  );

  return (
    <SurvivorContext.Provider value={value}>
      {children}
    </SurvivorContext.Provider>
  );
}

export function useSurvivor(): SurvivorContextInterface {
  const context = useContext(SurvivorContext);
  return context;
}
