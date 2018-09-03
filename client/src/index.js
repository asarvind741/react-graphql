import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Signin from './components/auth/Signin';
import Signup from './components/auth/Signup';
import registerServiceWorker from './registerServiceWorker';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


const client = new ApolloClient({
    uri: "http://localhost:4444/graphql"
})

const Root = () => {
    return <BrowserRouter>
    <Switch>
        <Route path = "/signin" component = { Signin} />
        <Route path = "/signup" component = { Signup} />
        <Route path = "/" exact component = { App} />
        <Redirect to = "/" />

    </Switch>
    </BrowserRouter>
}

ReactDOM.render(
<ApolloProvider client = {client}>
<Root />
</ApolloProvider>
, document.getElementById('root'));
registerServiceWorker();
