// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config({
//     path: 'variables.env'
// });
// const Recipe = require('./Models/Recipe');
// const User = require('./Models/User');

// // Bring in graphql express middleware
// const {
//     graphiqlExpress,
//     graphqlExpress
// } = require('apollo-server-express');
// const {
//     makeExecutableSchema
// } = require('graphql-tools');


// const {
//     typeDefs
// } = require('./schema');
// const {
//     resolvers
// } = require('./resolvers');

// const schema = makeExecutableSchema({
//     typeDefs,
//     resolvers
// })


// // Connect DB
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//         console.log('DB connected')
//     })
//     .catch((err) => {
//         console.log("Error occured with DB connection", err)
//     })

// // Initialize App
// const app = express();

// // cross origin domain
// const corsOptions = {
//     origin: 'http://localhost:3000',
// }
// app.use(cors(corsOptions));

// // Create graphiql application
// app.use('/graphiql', graphiqlExpress({
//     endpointURL: '/graphql'
// }))

// // connect schemas with GraphQL
// app.use('/graphql',
//  express.json(),
//  graphqlExpress({
//     schema, 
//     context: {
//         Recipe,
//         User
//     }
// }))



// const PORT = process.env.PORT || 4444;


// app.listen(PORT, () => {
//     console.log("Server is listing at " + PORT);
// })


// Include express
const express = require('express');
// Include mongoose
const mongoose = require('mongoose');
// Include JWT
const jwt = require('jsonwebtoken');
// Inculde cors
const cors = require('cors');
// inculde apollo-server-express
const { graphiqlExpress,graphqlExpress} = require('apollo-server-express');
// Include makeexecutable schema
const { makeExecutableSchema } = require('graphql-tools');

require('dotenv').config({ path: './variables.env'})

// Inculde modals
const Recipe = require('./Models/Recipe');
const User = require('./Models/User');

// Inculde schema
const { typeDefs } = require('./schema');
// Inculde resolvers
const { resolvers } = require('./resolvers');

// Create schema object
const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})


// Create mongo connect
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('DB connected')
    })
    .catch((err) => {
        console.log("Error occured with DB connection", err)
    })

// Create app
const app = express()

// cross origin domain
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true
}
app.use(cors(corsOptions));

// set up JWT authentication middleware
app.use(async(req, res, next) => {
    const token = req.headers['authorization'];
    if(token != 'null'){
        
        try {
            const currentUser = jwt.verify(token, 'asasfere3rfgfgo')
            req.currentUser = currentUser;
        }
        catch(err){
            console.log(err)
        }
    }
    next()
})

// create graphiql middleware application
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}))


app.use('/graphql',
express.json(),
graphqlExpress( ({currentUser}) =>({
    schema,
    context: {
        Recipe,
        User,
        currentUser
    }

})
));



const PORT = process.env.PORT || 4444;


app.listen(PORT, () => {
    console.log("Server is listing at " + PORT);
})

