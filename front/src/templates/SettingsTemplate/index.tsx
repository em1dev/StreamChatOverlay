import * as S from './style';
import { Header } from '@/components/Header';
import { SideNav } from './SideNav';
import { Outlet, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { Footer } from '@/components/Footer';
import { NoChats } from './NoChats';
import { useStore } from '@/store';


export const SettingsTemplate = () => {
  const isSideMenuOpen = useStore(s => s.isSideMenuOpen);
  const isLoadingSession = useStore(s => s.isLoadingSession);
  const session = useStore(s => s.session);
  const hasChats = useStore(s => s.chats.length > 0);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoadingSession) return;
    if (session) return;
    // unauth so go home
    navigate('/');
  }, [session, isLoadingSession, navigate]);

  useEffect(() => {
    document.body.classList = isSideMenuOpen ? 'noScroll' : '';
    return () => {
      document.body.classList = '';
    };
  }, [isSideMenuOpen]);

  return (
    <S.Container>
      <Header />
      <SideNav />
      { hasChats ? (
        <>
          <S.ContentContainer>
            <Outlet />
          </S.ContentContainer>
        </>
      ): (
        <S.NoContentContainer>
          <NoChats />
        </S.NoContentContainer>
      )}
      <Footer />
    </S.Container>
  );
};
