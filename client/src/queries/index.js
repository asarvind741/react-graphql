import  { gql } from 'apollo-boost';

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