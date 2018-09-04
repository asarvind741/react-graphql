import React from 'react';
import './App.css';

import { Query } from 'react-apollo';
import { GET_ALL_QUERIES } from '../queries/index';



const App = () => (
  <div className = "App">
  <h1>Home</h1>
  <Query query = { GET_ALL_QUERIES} >
  {({data, loading, error}) => {
    if(loading) return <div>Loading...</div>;
    if(error) {
      console.log(error);
      return <div>Error</div>;
    }
    
    return (
      <p>Recipes</p>
    )
  }}
 
  </Query>
  </div>
)

export default App;
