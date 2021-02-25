import { ApolloError, gql } from '@apollo/client';
import client from './client'


export function getUsers(){
  try {
    return client.query({
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

export function getUser(id){
  try {
    return client.query({
      query: gql`
        query getUser($id: ID){
          user(id: $id){
            profilePic
            username
            createdAt
          }
        }
      `,
      variables: {
        id
      }
    },
    )
  } catch (error) {
    throw new Error();
  }
}


