import React, { FunctionComponent, useState } from 'react';
import Swal from 'sweetalert2';
import * as Styled from './styles';

import { ApolloError, gql, useMutation } from '@apollo/client';

const LoginForm: FunctionComponent = () => {
  const [ userInput, setUserInput ] = useState({
    email: "",
    password: ""
  })

  const handleInputChange = (e) => { 
    const { id, value } = e.target;

    setUserInput(prevState => ({
      ...prevState,
      [id]: value
    }))
  }

  const Login = (email: string, password: string) => {

    

    debugger;
    
  }

  const validateLogin = (email: string, password: string) => {
    let errors = 0;

    if(email.trim() == ''){
      errors++;

      Swal.fire({
        icon: 'error',
        title: 'Por favor, digite seu e-mail'
      })
    } else if (password.trim() == '') {
      errors++;

      Swal.fire({
        icon: 'error',
        title: 'Por favor, digite sua senha'
      })
    } else if (!(/^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/).test(email)) {
      errors++;

      Swal.fire({
        icon: 'error',
        title: 'Por favor, digite um e-mail válido'
      })
    }

    return errors > 0 ? false : true
  }

  const LOGIN = gql`
        mutation MakeLogin($email: String!, $password: String!){
            login(email: $email, password: $password){
              username
              token
              email
            }
        } 
      `
      
  const [login] = useMutation(LOGIN, { 
    errorPolicy: "all",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = userInput;

    try {
      if(validateLogin(email, password)){
        const { data, errors } = await login({ variables : { email: email, password: password }});

        if(data){
          console.log('data :>> ', data);
          const { token } = data?.login;

          saveUserTokenOnCookie(token);

        } else if (errors?.length){
          Swal.fire({ 
            icon: "error",
            "title": `${errors[0]?.message}`
          })
        }
      }
    }
    catch(err){
      throw new Error(err);
    }
  }

  const saveUserTokenOnCookie = (token) => {
    debugger;
    document.cookie = `userAuthToken=${token}`;
  }

   

    return <Styled.Form onSubmit={handleSubmit}>
            <Styled.Label htmlFor ="email">E-mail</Styled.Label>
            <Styled.Input 
                id="email"
                type="email"
                onChange={handleInputChange}
            >
            </Styled.Input>
            <Styled.Label htmlFor ="password">Senha</Styled.Label>
            <Styled.Input 
              id="password" 
              type="password"
              onChange={handleInputChange}
            ></Styled.Input>
            <Styled.NewAccountLink>Não tem uma conta? <strong>Criar nova conta</strong></Styled.NewAccountLink>
            <Styled.Button>Entrar</Styled.Button>
          </Styled.Form>
}

export default LoginForm;

