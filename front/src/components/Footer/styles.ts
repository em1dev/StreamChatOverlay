import styled from 'styled-components';

export const Container = styled.footer`
  width: 100%;
  padding: 1em;
  margin-top: auto;
  display: flex;
  gap: 1em;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  a {
      color: inherit;
      text-decoration: none;
      &:hover, &:focus {
          color: #42a0ff;
          text-decoration: underline
      }
  }
`;
