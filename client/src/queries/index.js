import  { gql } from 'apollo-boost';

// Recipes Queries
export const GET_ALL_QUERIES = gql `

query {
    getAllRecipes {
        name
        description
        instructions
        category
        likes
        createdDate
        username
    }
}
`

// Recipes Mutation

// User Queries

export const GET_CURRENT_USER = gql `
query {
  getCurrentUser {
    username
    joinDate
    email
  }
}
`

// User mutation

export const SIGNUP_USER = gql `

mutation ($username: String!, $email: String!, $password: String!){
    signupUser(username:$username, email: $email, password: $password){
      token
    }
  }
`

export const SIGNIN_USER = gql `

mutation ($username: String!, $password: String!){
  signinUser(username:$username, password: $password){
      token
    }
  }
`