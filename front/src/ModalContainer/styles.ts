import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 99999999;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(4px);

  > div {
    display: flex;
    flex-direction: column;
    gap: 1em;
    margin: 0.5em;
    max-width: 100%;
    width: 30em;
    box-shadow: rgba(153, 105, 105, 0.45) 2px 4px 3px 0px;
    border-radius: 0.5rem;
    border: solid 0.1rem #f6d5d5;
    padding: 1em;
    background-color: ${({ theme }) => theme.page.colors.bg};

    h1 {
      font-weight: inherit;
      font-size: 1.2rem;
      margin: 0;
      color: #66363B;;
    }

    p {
      margin: 0;
    }

    footer {
      display: flex;
      justify-content: flex-end;
      gap: 0.5em;
    }
  }
`;
