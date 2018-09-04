import React from 'react';
import {ApolloConsumer } from 'react-apollo';
import { withRouter } from 'react-router-dom';

const handleSignout =(client, history) => {
    localStorage.removeItem('token');
    console.log(history)
    history.push('/');
    client.resetStore();
}

const signout = ({history}) => (

   
    <ApolloConsumer>
        {client => {
        
        return <button onClick = {() =>handleSignout(client, history)}>Signout</button>
        }}
    </ApolloConsumer>
   
)

export default withRouter(signout)