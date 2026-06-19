import * as S from './style';
import { Outlet } from 'react-router';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';


export const InfoTemplate = () => (
  <S.Container>
    <Header />
    <S.ContentContainer>
      <Outlet />
    </S.ContentContainer>
    <Footer />
  </S.Container>
);
