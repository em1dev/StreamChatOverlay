import styled, { css } from 'styled-components';


export type ButtonVariantKey = 'primary' | 'secondary' | 'ghost' | 'outline' | 'destructive' | 'link'
export type Size = 'icon-round' | 'icon-sm' | 'icon' | 'normal' | 'big';

export const Button = styled.button<{
  $variant?: ButtonVariantKey
  $size?: Size
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5em;
  padding: 0.5em;
  border: none;
  text-decoration: none;
  cursor: pointer;

  border-radius: ${({ theme }) => theme.page.borderRadius};

  transition: translate 0.1s ease-out, opacity 0.1s ease-out, background-color 0.1s ease-out, color 0.1s ease-out;

  &:active {
      translate: 0 1px;
      opacity: 0.8;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${({ $size = 'normal' }) => $size == 'icon-round' && css`
    border-radius: 100em;
    padding: 0.5em;
    font-size: 1em;
  `}

  ${({ $size = 'normal' }) => $size == 'icon-sm' && css`
    padding: 0.2em;
    font-size: 1em;
  `}

  ${({ $size = 'normal' }) => $size == 'icon' && css`
    padding: 0.2em;
    font-size: 1.5em;
`}

  ${({ $size = 'normal' }) => $size == 'normal' && css`
    padding: 0.5em;
  `}

  ${({ $size = 'normal' }) => $size == 'big' && css`
    padding: 1em;
  `}

  ${({ theme, $variant = 'secondary' }) => css`
    outline: ${theme.page.buttons[$variant].outline};
    background-color: ${theme.page.buttons[$variant].bg};
    color: ${theme.page.buttons[$variant].color};

    &:hover:not(:disabled) {
        background-color: ${theme.page.buttons[$variant].bg_hover};
        color: ${theme.page.buttons[$variant].color_hover};
        ${$variant === 'link' && css`
            text-decoration: underline;
        `}
    }
  `}
`;
