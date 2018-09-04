import React from 'react';
import { Mutation } from 'react-apollo';
import { SIGNIN_USER } from '../../queries/index';
import Spinner from '../UI/Spinner/Spinner';

import { withRouter } from 'react-router-dom';
class Signup extends React.Component {

    state = {
        username: '',
        password: '',
        loading : false,
        error: null
    }
    onSignupSubmit =(event, signinUser) => {
        this.setState({
            loading: true
        })
        event.preventDefault();
       
        signinUser().then(async({data}) => {
            this.setState({
                loading: false
            })
            localStorage.setItem('token', data.signinUser.token);
            await this.props.refetch();
            this.clearState();
            this.props.history.push('/')
        })
        .catch((err) => {
            this.setState({
                loading: false
            })
            this.clearState();
        })
    }

    clearState = () => {
        this.setState({
            username: '',
            password: ''
        })
    }

    handleChange =(event) => {
        const {name, value} = event.target
       this.setState({
        [name]: value
       })
    }

    cancelSubmit =() => {
    
        this.props.history.goBack();
    }
    
    render(){

        const { username, password } = this.state;
        let signinUse = (
            <Mutation mutation = { SIGNIN_USER } variables = {{ username, password}}>


            {(signinUser, {data, loading, error}) => {
                
                return (
                    <form 
                    onSubmit = { (event) => {this.onSignupSubmit(event, signinUser)}}
                    className = "col-xs-12 col-md-10 col-lg-8 col-xl-4 offset-md-3">
                    
                        <div className = "form-group">
                            <label>Username</label>
                            <input type = "text" 
                            name = "username" 
                            className = "form-control" 
                            value = {this.state.username}
                            onChange = { this.handleChange}
                            />
                        </div>
                    
                        <div className = "form-group">
                        <label>Password:</label>
                        <input 
                        type = "password" 
                        name = "password" 
                        className = "form-control"
                        value = {this.state.password}
                        onChange = { this.handleChange}/>
                        </div>
                       
            
                        <button className = "btn btn-primary" type = "submit"> Submit</button>
                        <button 
                        className = "btn btn-danger" 
                        type = "button" 
                        onClick = {this.cancelSubmit}
                        style = {{'margin': '5px'}}> Cancel</button>
                    </form>
                    
                )
            }}
       
        </Mutation>
        )

        if(this.state.loading){
            signinUse = <Spinner />
        }
        return (
        <div className = "App">
        <h2 className = "App">
        Signin
        </h2>
         { signinUse }
        </div>
        )
    }
}

export default withRouter(Signup);