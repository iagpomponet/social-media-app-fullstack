import * as Styled from "./styles";
import React, { FunctionComponent } from 'react';


const Label: FunctionComponent = ({ children }) => {
  return <Styled.Label>
    { children } 
  </Styled.Label>;
}

export default Label;