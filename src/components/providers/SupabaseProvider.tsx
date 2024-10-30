import { SupabaseConnector } from '@/library/powersync/SupabaseConnector';
import React, { useEffect } from 'react';
import { db } from './PowerSyncProvider';

const SupabaseContext = React.createContext<SupabaseConnector | null>(null);
export const useSupabase = () => React.useContext(SupabaseContext);

interface Props {
  children: React.ReactNode;
}

export const SupabaseConnectorProvider = ({ children }: Props) => {
  const [connector] = React.useState(new SupabaseConnector());

  useEffect(() => {
    const listener = connector.registerListener({
      initialized: () => {},
      sessionStarted: () => {
        db.connect(connector);
      }
    });

    connector.init();

    return () => listener?.();
  }, [connector]);

  return (
    <SupabaseContext.Provider value={connector}>
      {children}
    </SupabaseContext.Provider>
  );
};
