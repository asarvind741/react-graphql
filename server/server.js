const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({
    path: 'variables.env'
});
const Recipe = require('./Models/Recipe');
const User = require('./Models/User');

// Bring in graphql express middleware
const {
    graphiqlExpress,
    graphqlExpress
} = require('apollo-server-express');
const {
    makeExecutableSchema
} = require('graphql-tools');


const {
    typeDefs
} = require('./schema');
const {
    resolvers
} = require('./resolvers');

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})


// Connect DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('DB connected')
    })
    .catch((err) => {
        console.log("Error occured with DB connection", err)
    })

// Initialize App
const app = express();

// cross origin domain
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsOptions));

// Create graphiql application
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}))

// connect schemas with GraphQL
app.use('/graphql',
 express.json(),
 graphqlExpress({
    schema, 
    context: {
        Recipe,
        User
    }
}))



const PORT = process.env.PORT || 4444;


app.listen(PORT, () => {
    console.log("Server is listing at " + PORT);
})