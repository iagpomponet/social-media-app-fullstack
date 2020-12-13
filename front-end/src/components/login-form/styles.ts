import styled from "styled-components";

 
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  justify-content: center;
`

export const Label = styled.label `
  font-weight: 700;
  margin: 10px 0;
  color: ${props => props.theme.colors.secondary};
`

export const Button = styled.button`
  background-color: ${props => props.theme.colors.secondary};
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  margin: 10px 0;
  font-size: 16px;
  border-radius: ${props => props.theme.borderRadius};
  transition: 0.4s;

  &:hover {
    opacity: 0.7; 
    cursor: pointer;
  }
`

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