import React, { Fragment} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import Navbar from './components/navbar';
import Search from './components/Recipe/Search';
import AddRecipe from './components/Recipe/AddRecipe';
import Profile from './components/Profile/Profile';
import RecipeDetails from './components/Recipe/RecipeDetails';
import registerServiceWorker from './registerServiceWorker';
import withSession from './components/withSession'

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

//create client app
const client = new ApolloClient({
    uri: "http://localhost:4444/graphql",
    fetchOptions: {
        credentials: 'include'
    },
    request: operation => {
        const token = localStorage.getItem('token');
        operation.setContext({
            headers: {
                authorization: token
            }
        })
    },
    onError: ({ networkError}) => {
        if(networkError){
            console.log("Network Error", networkError);
        }

        // if(networkError.statusCode === 401){
        //     localStorage.removeItem('token')
        // }
    }
})

const Root = ({refetch, session}) => {
    return <BrowserRouter>
    <Fragment>
    <Navbar session = {session}/>
    <Switch>
        <Route path = "/signin" render  = {() => <Signin refetch = {refetch} />}/>
        <Route path = "/recipe/:id" render = {() => <RecipeDetails />} />
        <Route path = "/recipe/add" render  = {() => <AddRecipe refetch = {refetch} />}/>
        <Route path = "/profile" render  = {() => <Profile refetch = {refetch} />}/>
        <Route path = "/search" render  = {() => <Search refetch = {refetch} />}/>
        <Route path = "/signup" render  = {() => <Signup refetch = {refetch} />} />
        <Route path = "/" exact component = { App} />
        <Redirect to = "/" />
    </Switch>
    </Fragment>
    </BrowserRouter>
}

const RootWithSession = withSession(Root)

ReactDOM.render(
<ApolloProvider client = {client}>
<RootWithSession />
</ApolloProvider>
, document.getElementById('root'));
registerServiceWorker();
