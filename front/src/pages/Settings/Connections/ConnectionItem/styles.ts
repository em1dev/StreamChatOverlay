import styled from 'styled-components';

export const ConnectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1em;
  border-radius: 1em;
  outline: none;

  gap: 0.2em;

  background: none;
  &:hover,
  &:focus {
    background: #e6dad1;
  }
  color: ${({ theme }) => theme.page.colors.primary_text };
  border: solid 2px ${({ theme }) => theme.page.colors.primary_text };
`;

export const TypeLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2em;
  text-transform: capitalize;
`;

export const Container = styled.div`
  border-radius: 1em;
  padding: 0.5em 1em;
  @media (${({ theme }) => theme.page.query.mobile}) {
    padding: 0.5em;
  }
  display: flex;
  gap: 1em;
  align-items: center;

  img {
    border-radius: 2em;
    border: solid 2px ${({ theme }) => theme.page.colors.primary_text };
  }
  > div {
    display:flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5em;
  }

  p {
      margin: 0;
  }

  button {
      margin-left: auto;
      width: 2em;
      height: 2em;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      border-radius: 5em;
      outline: none;
      border: none;
      background: none;
      color: ${({ theme }) => theme.page.colors.primary_text };
      &:hover,
      &:focus {
        background: #e6dad1;
      }
  }

  border: solid 2px ${({ theme }) => theme.page.colors.primary_text };
`;

export const Loading = styled(Container)``;

export const PlaceholderImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 2em;
  border: solid 2px ${({ theme }) => theme.page.colors.primary_text };
`;
