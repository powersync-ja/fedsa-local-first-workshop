import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginDetailsWidget } from '@/components/widgets/LoginDetailsWidget';
import { useSupabase } from '@/components/providers/SupabaseProvider';
import { DEFAULT_ENTRY_ROUTE } from '@/app/router';
import { usePowerSync } from '@powersync/react';

export default function LoginPage() {
  const supabase = useSupabase();
  const powerSync = usePowerSync();
  const navigate = useNavigate();

  // Adding this to clear db from previous unauthenticated session
  // Can remove after loading initially
  useEffect(() => {
    powerSync.disconnectAndClear();
  }, []);

  return (
    <LoginDetailsWidget
      title="Login"
      submitTitle="Login"
      onSubmit={async (values) => {
        if (!supabase) {
          throw new Error('Supabase has not been initialized yet');
        }
        await supabase.login(values.email, values.password);
        navigate(DEFAULT_ENTRY_ROUTE);
      }}
      secondaryActions={[
        {
          title: 'Register',
          onClick: () => {
            navigate('/auth/register');
          }
        }
      ]}
    />
  );
}
