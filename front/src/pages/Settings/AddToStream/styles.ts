import styled from 'styled-components';

export const WarningContainer = styled.div`
  padding: 1em;
  border-radius: 1em;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1em;
  margin: 1em 0;

  color: ${({ theme }) => theme.page.colors.warning_text };
  background-color: ${({ theme }) => theme.page.colors.warning_bg };

  svg {
    font-size: 1.8em;
  }

  p:first-child {
    margin-top: 0;
  }

  button {
    cursor: pointer;
    border: none;
    border-radius: 1em;
    padding: 0.8em 1em;

    color: ${({ theme }) => theme.page.colors.danger_text };
    background-color: ${({ theme }) => theme.page.colors.danger_bg };
    &:hover:not(:disabled)
    {
      background-color: ${({ theme }) => theme.page.colors.danger_bg_hover };
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;

export const ClickToCopyBtn = styled.button`
  margin: auto;
  display: block;
  padding: 1em;
  border-radius: 2em;
  border: none;

  color: ${({ theme }) => theme.page.colors.primary_text };
  background-color: ${({ theme }) => theme.page.colors.primary_bg };
  &:hover:not(:disabled)
  {
    background-color: ${({ theme }) => theme.page.colors.primary_bg_hover };
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const StepContainer = styled.div`

  margin-bottom: 2em;

  > p {
    margin-left: 2em;
    margin-bottom: 0;
    margin-top: 0.5em;
  }

  > p:first-child {
    margin-left: 0;
    display: flex;
    gap: 1em;
    align-items: center;

    &:before {
      content: ' ';
      display: block;
      width: 1em;
      height: 1em;
      border-radius: 100%;
      background-color: #E2ABB3;
    }
  }

  img {
    width: 100%;
    margin: 1em 0;
  }
`;