import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom'
import { Query } from 'react-apollo';
import { GET_RECIPE_BY_ID } from '../../queries/index';

const recipeDetails = (props) => (

<Query query = { GET_RECIPE_BY_ID }  >
  {({data, loading, error}) => {
    if(loading) return <div>Loading...</div>;
    if(error) {
      console.log(error);
      return <div>Error</div>;
    }
    console.log("data", data)
    
    return (
      <Fragment>
      <p>Recipes</p>
      <ul>Recipe Details</ul>
      </Fragment>
    )
  }}
 
  </Query>
  
)

export default withRouter(recipeDetails)