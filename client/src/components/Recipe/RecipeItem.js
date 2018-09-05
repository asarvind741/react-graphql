import React from 'react';
import { Link } from 'react-router-dom';

class RecipeItem extends React.Component {

    render(){
        const {item} = this.props;
        return(
        <Link to = {'/recipe/' + item.id}>
        <div className = "RecipeItem">
        <h4>{item.name}</h4>
        <p>{item.category }</p>
        <p style = {{'color': 'red'}}>{item.description}</p>
       </div>
       </Link>
        )
    }
    
}

export default RecipeItem;