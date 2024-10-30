import { CircularProgress } from '@mui/material';
import React, { Suspense } from 'react';
import { NavigationPanelContextProvider } from '../navigation/NavigationPanelContext';
import { PowerSyncProvider } from './PowerSyncProvider';
import { SupabaseConnectorProvider } from './SupabaseProvider';

const ENABLE_SUPABASE = !!(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

interface Props {
  children: React.ReactNode;
}

export const SystemProvider = ({ children }: Props) => {
  const content = (
    <NavigationPanelContextProvider>
      {children}
    </NavigationPanelContextProvider>
  );

  return (
    <Suspense fallback={<CircularProgress />}>
      <PowerSyncProvider>
        {ENABLE_SUPABASE ? (
          <SupabaseConnectorProvider>
            {content}
          </SupabaseConnectorProvider>
        ) : content}
      </PowerSyncProvider>
    </Suspense>
  );
};

export default SystemProvider;
