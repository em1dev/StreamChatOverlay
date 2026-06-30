import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
  `;

export const Option = styled.option<{ $fontFamily: string }>`
  font-family: '${({ $fontFamily }) => $fontFamily}';
`;

export const WeightRadioGroup = styled.div`
  font-size: 0.9em;
  margin: auto;
  display: flex;
  gap: 0.5em;
  align-items: center;
  justify-content: center;
  padding: 0.5em;

  > label {
    padding: 0.1em 0.3em;
    border: solid 0.1em;
    border-radius: ${({ theme }) => theme.page.borderRadius};
    cursor: pointer;
    color: ${({ theme }) => theme.page.colors.secondary_text };
    border-color: ${({ theme }) => theme.page.colors.secondary_text };

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input:checked + label {
    color: ${({ theme }) => theme.page.colors.bg };
    background-color: ${({ theme }) => theme.page.colors.secondary_text };
  }
`;
