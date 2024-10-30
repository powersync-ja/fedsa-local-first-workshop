import { PowerSyncContext } from '@powersync/react';
import { PowerSyncDatabase } from '@powersync/web';
import { AppSchema } from '@/library/powersync/AppSchema';
import { configureFts } from '@/app/utils/ftsSetup';
import Logger from 'js-logger';
import React, { useEffect } from 'react';

export const db = new PowerSyncDatabase({
  schema: AppSchema,
  database: {
    dbFilename: 'example.db'
  }
});

interface Props {
  children: React.ReactNode;
}

export const PowerSyncProvider = ({ children }: Props) => {
  const [powerSync] = React.useState(db);

  useEffect(() => {
    Logger.useDefaults();
    Logger.setLevel(Logger.DEBUG);
    // For console testing purposes
    (window as any)._powersync = powerSync;

    powerSync.init();

    // Demo using SQLite Full-Text Search with PowerSync.
    configureFts();
  }, [powerSync]);

  return (
    <PowerSyncContext.Provider value={powerSync}>
      {children}
    </PowerSyncContext.Provider>
  );
};
