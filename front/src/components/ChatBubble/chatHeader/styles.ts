import styled from 'styled-components';

export const Container = styled.div`
  margin-right: 8px;
  margin-bottom: -8px;
  padding: 0.4em 0.8em 0.8em 0.8em;

  display: flex;
  align-items: center;
  justify-content: end;
  min-height: 40px;

  gap: 0.5em;

  background-color: ${(prorps) => prorps.theme.chat.header.bg};
  color: ${(prorps) => prorps.theme.chat.header.text};
  border: ${(prorps) => prorps.theme.chat.header.border};
  border-radius: ${(prorps) => prorps.theme.chat.header.borderRadius};
`;

export const Badge = styled.img`
  //margin: 0 0.2em;
`;

export const Pronouns = styled.div`
  font-weight: 600;
  //margin: 0 0.5ch;
`;

export const UserName = styled.div<{color?: string}>`
`;