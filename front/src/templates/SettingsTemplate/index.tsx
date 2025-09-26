import * as S from './style';
import { Header } from '@/templates/SettingsTemplate/Header';
import { SideNav } from './SideNav';

export interface SettingsTemplateProps {
  children: React.ReactNode
}

export const SettingsTemplate = ({ children }: SettingsTemplateProps) => (
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