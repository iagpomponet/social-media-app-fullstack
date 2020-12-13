import { ApolloError, gql, useMutation } from '@apollo/client';
import client from './client'


type userInput = {
  email: String,
  password: String
}

export function getUsers(){
  try {
    client.query({
      query: gql`
        query {
          users{
            _id
            username
          }
        }
      `
    })
    .then(result => result)
  } catch (error) {
    throw new ApolloError(error)
  }
}

export function Login(userInput: userInput){
  const { email, password } = userInput;
  const LOGIN = gql`
    mutation login(email: email, password: password){
      token
    }
  `
  const [login, { data }] = useMutation(LOGIN)
}