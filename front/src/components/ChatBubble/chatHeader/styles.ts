import styled from 'styled-components';

export const Container = styled.div`
  margin-right: 8px;
  margin-bottom: -8px;
  border-radius: 12px;
  padding: 0.5em 0.8em 0.8em 0.8em;

  background-color: #2a2a2a;
  display: flex;
  align-items: center;
  justify-content: end;
  min-height: 30px;
  color: #F6D6BD;
`;

export const Badge = styled.img`
  margin: 0 0.2em;
`;

export const Pronouns = styled.div`
  font-weight: 600;
  margin: 0 0.5ch;
`;

export const UserName = styled.div<{color?: string}>`
`;