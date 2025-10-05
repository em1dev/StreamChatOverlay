import * as S from './style';
import { Header } from '@/templates/SettingsTemplate/Header';
import { SideNav } from './SideNav';
import { useAuth } from '@/context/authContext/useAuth';
import { Outlet, useNavigate } from 'react-router';
import { useEffect } from 'react';


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
      <div>
        <SideNav />
        <div>
          <Outlet />
        </div>
      </div>
    </S.Container>
  );
};