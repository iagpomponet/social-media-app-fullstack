import styled from "styled-components";

export const Login = styled.main`
  display: flex;
  align-items: center;
  height: 100vh;
`

export const Container = styled.div`
  max-width: 600px;
  width: 100%;
  padding: 0 1rem;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 32px;
  margin: 20px 0;
  color: ${props => props.theme.colors.secondary}
`;



