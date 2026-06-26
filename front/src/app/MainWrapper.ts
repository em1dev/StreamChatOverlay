import '@/fonts/SettingsFonts';
import { useOutlet } from 'react-router';

export const MainWrapper = () => {
  const outlet = useOutlet();
  return outlet;
};
