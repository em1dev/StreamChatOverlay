import styled from "styled-components";

export const ContentExtras = styled.span`
  padding: 0.5em;
  color: #F6D6BD;
  background-color: #2a2a2a;
  border-radius: 0.8em;
  display: inline-block;
  + * {
    margin: 0.3em;
  }
`;

export const Reply = styled(ContentExtras)`
  color: #2a2a2a;
  background-color: #bea088;
`

export const Redemption = styled(ContentExtras)`
  display: block;
`;