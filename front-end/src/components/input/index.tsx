import * as Styled from "./styles";
import * as React from 'react';


const Input: React.FunctionComponent = (props) => {
  return <Styled.Input onChange={props.onChange} {...props}/>
}

export default Input;