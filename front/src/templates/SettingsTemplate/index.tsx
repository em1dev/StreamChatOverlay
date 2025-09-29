import * as S from './style';
import { Header } from '@/templates/SettingsTemplate/Header';
import { SideNav } from './SideNav';
import { useAuth } from '@/authContext/useAuth';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

export interface SettingsTemplateProps {
  children: React.ReactNode
}

export const SettingsTemplate = ({ children }: SettingsTemplateProps) => {
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
          {children}
        </div>
      </div>
    </S.Container>
  );
};