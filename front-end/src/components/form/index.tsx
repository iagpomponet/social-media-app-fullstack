import * as Styled from "./styles";
import React, { FunctionComponent } from 'react';


interface Props {
  props: string
}

const Form = ({ children, onSubmit }) => {
  return <Styled.Form onSubmit={onSubmit}>
    { children }
  </Styled.Form>;
}

export default Form;
