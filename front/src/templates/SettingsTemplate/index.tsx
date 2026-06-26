import * as S from './style';
import { Header } from '@/components/Header';
import { SideNav } from './SideNav';
import { Outlet, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { Footer } from '@/components/Footer';
import { useSideMenuStore } from '@/store/sideMenuStore';
import { SettingsSynchronizer } from '@/utils/SettingsSynchronizer';
import { useAuth } from '@/store/authStore';


export const SettingsTemplate = () => {
  const isOpen = useSideMenuStore(s => s.isOpen);
  const { isLoading, session } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !session) {
      navigate('/');
    }
  }, [session, isLoading, navigate]);

  useEffect(() => {
    document.body.classList = isOpen ? 'noScroll' : '';
    return () => {
      document.body.classList = '';
    };
  }, [isOpen]);

  return (
    <S.Container>
      <SettingsSynchronizer />
      <Header />
      <SideNav />
      <S.ContentContainer>
        <Outlet />
      </S.ContentContainer>
      <Footer />
    </S.Container>
  );
};
