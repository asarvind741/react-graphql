import React, { Fragment} from 'react';
import './App.css';

import { Query } from 'react-apollo';
import { GET_ALL_QUERIES } from '../queries/index';
import RecipeItem from './Recipe/RecipeItem';




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
    const recipeItems = data.getAllRecipes.map((recipeItem, index) => (
      <RecipeItem item = {recipeItem} key = { index} />
    ))
    
    return (
      <Fragment>
      <p>Recipes</p>
      <ul>{recipeItems}</ul>
      </Fragment>
    )
  }}
 
  </Query>
  </div>
)

export default App;
