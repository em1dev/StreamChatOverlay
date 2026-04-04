import { AuthProvider } from '../context/authContext/authProvider';
import { SettingsSynchronizer } from '../utils/SettingsSynchronizer';
import { Outlet } from 'react-router';

import '@/fonts/ChatFonts';
import '@/fonts/SettingsFonts';

const SettingsWrapper = () => (
  <AuthProvider>
    <SettingsSynchronizer />
    <Outlet />
  </AuthProvider>
);

export default SettingsWrapper;