const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (user, secret, expiresIn) => {
    const { username, email } = user
    return jwt.sign({username, email}, secret, {expiresIn})
}

exports.resolvers = {
    Query: {
        getAllRecipes: async(root, args, { Recipe}) => {
            const allRecipes =  await Recipe.find();
            return allRecipes;          
        },
        getRecipe: async(root, {id}, {Recipe}) => {
            if(!id){
                return Null;
            }

            const recipe = await Recipe.findOne({_id: id});

            if(!Recipe){
                throw new Error('No Recipe Found')
            }

            return recipe;
        },
        getCurrentUser: async(root, args, { currentUser, User}) => {
            if(!currentUser){
                return null;
            }

            const user = await User.findOne({username:currentUser.username})
            .populate({
                path: 'favourites',
                model: 'Recipe'
            });

            return user;
        }
    },

    Mutation : {
        addRecipe: async(root, {name, description, category, instructions, username}, { Recipe}) => {
            const newRecipe = await new Recipe({
                name,
                description,
                category,
                instructions,
                username
            }).save();
            return newRecipe;
        },
        signupUser: async(root, { username, email, password}, { User}) => {
            const user = await User.findOne({username});
            if(user){
                throw new Error('User already exists')
            }
            const newUser = await new User({
                username,
                email,
                password
            }).save();
            return { token: createToken(newUser, 'asasfere3rfgfgo', '2hr')}
        },
        signinUser: async(root, { username, password}, { User}) => {
            const user = await User.findOne({username})
            if(!user){
                throw new Error('User Not Found...');
            }
            let isValidPassword = await bcrypt.compare(password, user.password)

            if(!isValidPassword){
                throw new Error('Invalid Password Entered')
            }
            return { token: createToken(user, 'asasfere3rfgfgo', '2hr')}
        }
    }
}