import styled from 'styled-components';

export const Main = styled.main`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-top: 8em;
  overflow: hidden;

  font-size: 1.3em;

  h1 {
    color: ${(props) => props.theme.page.colors.title};
    font-family: 'Caveat';
    font-size: 3em;
    margin: 0;
  }

  h2 {
    font-weight: inherit;
    font-size: inherit;
    margin: 0;
  }

  p {
    margin: 0;
  }

  ul {
    margin: 0.5em;
  }

  > section:first-child {
    margin: auto;
    display: flex;
    gap: 5em;
    padding: 1em;
    padding-bottom: 5em;
    max-width: 100%;

    > div {
      display: flex;
      flex-direction: column;
      gap: 1em;
    }

    @media screen and (max-width: 1200px) {
      flex-direction: column;
    }
  }
`;

export const CTAContainer = styled.div`
  display: flex;
  gap: 0.5em;
  margin-top: 1em;

  button, a {
    text-align: center;
    text-decoration: none;
    border: none;
    border-radius: 5em;
    padding: 1em;
    width: 100%;
    display: block;
    font-size: inherit;
    font-family: inherit;
    cursor: pointer;
  }

  button {
    color: ${({ theme }) => theme.page.colors.primary_text };
    background-color: ${({ theme }) => theme.page.colors.primary_bg };
    &:hover
    {
      background-color: ${({ theme }) => theme.page.colors.primary_bg_hover };
    }
  }

  a {
    color: ${({ theme }) => theme.page.colors.secondary_text };
    background-color: ${({ theme }) => theme.page.colors.secondary_bg };
    border: ${({ theme }) => theme.page.colors.secondary_border };
    &:hover
    {
      background-color: ${({ theme }) => theme.page.colors.secondary_bg_hover };
    }
  }
`;

export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

export const ChatContainer = styled.div`
  padding: 0 5em;
  width: 600px;
  height: 600px;
  position: relative;
  > img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
  }
`;

// Blob css from https://toruskit.com/tools/blobz/index.html#install
export const Blob = styled.div`
  z-index: -1;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;

  animation: blob-turn var(--time, 100s) linear infinite;
  fill: var(--fill, #7600f8);
  transform-origin: center;

  svg {
    animation: blob-skew calc( var(--time, 100s) * 0.5 ) linear 0s infinite;
    transform-origin: center;
  }

  svg path {
    animation: blob-scale calc( var(--time, 100s) * 0.5 ) ease-in-out 0s infinite;
    transform-origin: center;
  }

  @keyframes blob-turn {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes blob-skew {
    0% {
      transform: skewY(0deg);
    }
    13% {
      transform: skewY( calc( (1.8deg) * var(--amount, 2)) );
    }
    18% {
      transform: skewY( calc( (2.2deg) * var(--amount, 2)) );
    }
    24% {
      transform: skewY( calc( (2.48deg) * var(--amount, 2)) );
    }
    25% {
      transform: skewY( calc( (2.5deg) * var(--amount, 2)) );
    }
    26% {
      transform: skewY( calc( (2.48deg) * var(--amount, 2)) );
    }
    32% {
      transform: skewY( calc( (2.2deg) * var(--amount, 2)) );
    }
    37% {
      transform: skewY( calc( (1.8deg) * var(--amount, 2)) );
    }
    50% {
      transform: skewY(0deg);
    }
    63% {
      transform: skewY( calc( (-1.8deg) * var(--amount, 2)) );
    }
    68% {
      transform: skewY( calc( (-2.2deg) * var(--amount, 2)) );
    }
    74% {
      transform: skewY( calc( (-2.48deg) * var(--amount, 2)) );
    }
    75% {
      transform: skewY( calc( (-2.5deg) * var(--amount, 2)) );
    }
    76% {
      transform: skewY( calc( (-2.48deg) * var(--amount, 2)) );
    }
    82% {
      transform: skewY( calc( (-2.2deg) * var(--amount, 2)) );
    }
    87% {
      transform: skewY( calc( (-1.8deg) * var(--amount, 2)) );
    }
    100% {
      transform: skewY(0deg);
    }
  }

  @keyframes blob-scale {
    0% {
      transform: scaleX(.9) scaleY(1);
    }
    25% {
      transform: scaleX(.9) scaleY(.9);
    }
    50% {
      transform: scaleX(1) scaleY(.9);
    }
    75% {
      transform: scaleX(.9) scaleY(.9);
    }
    100% {
      transform: scaleX(.9) scaleY(1);
    }
  }
`;