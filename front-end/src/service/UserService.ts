import { ApolloError, gql } from '@apollo/client';
import client from './client'



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

export async function Login(email: string, password: string){
  
  
  
}