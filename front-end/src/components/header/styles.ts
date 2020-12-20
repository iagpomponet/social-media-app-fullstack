import styled from 'styled-components';

export const Header = styled.header`
  display: flex;
  background-color: ${props => props.theme.colors.secondary};
  height: 60px;
  padding: 0 1rem;
`

export const Container = styled.div`
  display: flex;
  align-items: center;
  color: white;
  font-weight: bold;
  justify-content: space-between;

  margin: 0 auto;
  max-width: 1440px;
  width: 100%;
`

export const Logout = styled.div`
  svg {
    width: 20px;
    height: 20px;
    fill: white!important;
    transition: opacity 0.4s ease-in-out;
  
    &:hover {
      cursor: pointer;
      opacity: 0.7;
    }
  }
`