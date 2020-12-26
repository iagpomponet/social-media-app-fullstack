import React, { FunctionComponent, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

import * as Styled from './styles';

import { useAuth } from '../../contexts/auth';
import Form from '../form/index';
import Input from '../input/index';
import Label from '../label/index'



const RegisterForm: FunctionComponent = () => {
  const { user, setUser } = useAuth();
  const [inputsValue, setInputValue] = useState();

  const history = useHistory();

  const REGISTER = gql`
      mutation makeLogin(
        $email: String!
        $username: String!
        $password: String!
        $confirmPassword: String!
        $profilePic: String!
      ){
        register(registerInput: {
        email: $email
        username: $username
        password: $password
        confirmPassword: $confirmPassword
        profilePic: $profilePic
      }){
        username
        profilePic
        email
      }
      }
    `

    const [register] = useMutation(REGISTER, {
      errorPolicy: "all"
    })


  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    
    if(!inputsValue){
      return;
    }

    const { username, email, password, confirmPassword, profilePic } = inputsValue;

    const uploadPreset = process.env.REACT_APP_UPLOAD_PRESET ? process.env.REACT_APP_UPLOAD_PRESET : '';
    
    const formData = new FormData();
    formData.append('file', profilePic);
    formData.append('upload_preset', uploadPreset);

    const imageUploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`, 
        {
          method: 'POST',
          body: formData
        }
      ).then(res => res.json());

    const { secure_url } = imageUploadResponse;

    try {
      const { data, errors } = await register({
        variables: {
          email,
          username,
          password,
          confirmPassword,
          profilePic: secure_url
        }
      })

      if(errors?.length){
        Swal.fire({
          icon: 'error',
          title: errors[0].message
        })
      } 

      if(data){
        const newUserData = {
          ...data?.register,
          signed: true
        }

        setUser(newUserData);
        localStorage.setItem('userData', JSON.stringify(newUserData));
        history.push('/');
      }

    }
    catch (err) {
      throw new Error(err);
    }
  }

  const handleChange = (e) => {
    const { id } = e.target;
    let { value } = e.target;
    

    if(id == "profilePic"){
      value = e.target.files[0];
    }

    setInputValue({
      ...inputsValue,
      [id]: value
    })
  }

  return <Form onSubmit={handleSubmit}>
          <Label Label>Email:</Label>
          <Input onChange={handleChange} id="email" type="text" placeholder="E-mail" />
          
          <Label>Seu nome:</Label>
          <Input onChange={handleChange} id="username" type="text" placeholder="Nome" />
          
          <Label>Senha:</Label>
          <Input onChange={handleChange} id="password" type="password" placeholder="Senha" />
          
          <Label>Confirme sua senha:</Label>
          <Input onChange={handleChange} id="confirmPassword" type="password" placeholder="Confirme sua senha" />
          <Input onChange={handleChange} id="profilePic" type="file" placeholder="Escolher arquivo"/>
          
          <Styled.Button>
            Cadastrar-se
          </Styled.Button>
        </Form>
}

export default RegisterForm;