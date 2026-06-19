import * as S from './style';
import { Header } from '@/components/Header';
import { SideNav } from './SideNav';
import { useAuth } from '@/context/authContext/useAuth';
import { Outlet, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { Footer } from '@/components/Footer';
import { useSideMenuStore } from '@/store/sideMenuStore';


export const SettingsTemplate = () => {
  const isOpen = useSideMenuStore(s => s.isOpen);
  const { session, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session && !isLoading) {
      navigate('/');
    }
  }, [session, navigate, isLoading]);

  useEffect(() => {
    document.body.classList = isOpen ? 'noScroll' : '';
    return () => {
      document.body.classList = '';
    };
  }, [isOpen]);

  return (
    <S.Container>
      <Header />
      <SideNav />
      <S.ContentContainer>
        <Outlet />
      </S.ContentContainer>
      <Footer />
    </S.Container>
  );
};
