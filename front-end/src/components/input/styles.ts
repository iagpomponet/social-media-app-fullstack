import styled  from 'styled-components';


export const Input = styled.input`
  border: 1px solid black;
  height: 40px;
  margin: 4px 0;
  border-radius: ${props => props.theme.borderRadius};
  padding-left: 10px;
  transition: 0.3s;

  &:focus {
    border-color: ${props => props.theme.colors.secondary};
  }
`