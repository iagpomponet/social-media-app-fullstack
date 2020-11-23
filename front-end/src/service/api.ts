import { ApolloClient, InMemoryCache, gql } from '@apollo/client';


export default class Api {
  static getUsers(){
    const client = new ApolloClient({
      uri: 'http://localhost:5000',
      cache: new InMemoryCache()
    })

    console.log('client :>> ', client);

    // client.query({
    //   query: gql`
    //     query users{
    //       id
    //       username
    //     }
    //   `
    // })
    // .then(result => console.log(result))
  }
}