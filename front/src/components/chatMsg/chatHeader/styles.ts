import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  min-height: 30px;
  margin-bottom: 0.3em;
`;

export const Badges = styled.div`
  margin: 0 0.2em;
`;

export const Pronouns = styled.div`
  border: solid 0.15em white;
  padding: 0.2em 0.5em;
  border-radius: 0.7em;
  color: white;
  margin: 0 0.3em;
`;

export const UserName = styled.div<{color?: string}>`
  color: ${({ color }) => color ? color : '#13a25a'};
`;