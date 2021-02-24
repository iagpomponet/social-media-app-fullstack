import * as Styled from "./styles";
import * as React from 'react';


const Input = (props) => {
  return <Styled.Input onChange={props.onChange} {...props}/>
}

export default Input;
