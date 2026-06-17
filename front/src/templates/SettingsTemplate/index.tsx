import * as S from './style';
import { Header } from '@/components/Header';
import { SideNav } from './SideNav';
import { useAuth } from '@/context/authContext/useAuth';
import { Outlet, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { Footer } from '@/components/Footer';


export const SettingsTemplate = () => {
  const { session, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!session && !isLoading) {
      navigate('/');
    }
  }, [session, navigate, isLoading]);

  return (
    <S.Container>
      <Header />
      <S.InnerContainer>
        <SideNav />
        <div>
          <Outlet />
        </div>
      </S.InnerContainer>
      <Footer />
    </S.Container>
  );
};
