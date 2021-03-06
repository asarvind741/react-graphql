exports.typeDefs = `

type Recipe {
    id: ID!
    name: String!
    category: String!
    description: String!
    instructions: String!
    createdDate: String
    likes: Int,
    username: String

}

type User {
    id: ID!
    username: String! @unique
    password: String!
    email: String!
    joinDate: String
    favourites: [Recipe]
}

type Query {
    getAllRecipes:[Recipe]
    getCurrentUser: User
    getRecipe(id: ID!): Recipe
}

type Token {
    token: String!
}



type Mutation {
    addRecipe(name: String!, description: String, category: String!, instructions: String!, username: String): Recipe
    signinUser(username: String!, password: String!): Token
    signupUser(username: String!, email: String!, password: String!): Token

}

`