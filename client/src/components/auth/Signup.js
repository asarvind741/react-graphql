import React from 'react';
import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from '../../queries/index';
import Spinner from '../UI/Spinner/Spinner';
class Signup extends React.Component {

    state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        loading : false,
        error: null
    }
    onSignupSubmit =(event, signupUser) => {
        this.setState({
            loading: true
        })
        event.preventDefault();
       
        signupUser().then(data => {
            console.log(data);
            this.setState({
                loading: false
            })
        })
        .catch((err) => {
            console.log(err)
            this.setState({
                loading: false
            })
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

        const { username, email, password } = this.state;
        let signpuCom = (
            <Mutation mutation = { SIGNUP_USER } variables = {{ username, email, password}}>


            {(signupUser, {data, loading, error}) => {
                
                return (
                    <form 
                    onSubmit = { (event) => {this.onSignupSubmit(event, signupUser)}}
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
                        <div className = "form-group" >
                        <label>Email:</label>
                        <input 
                        type = "email" 
                        name = "email"
                        className = "form-control"
                        value = {this.state.email}
                        onChange = { this.handleChange}/>
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
                        <div>
                        <label>Confirm Password:</label>
                        <input 
                        type = "password" 
                        name = "confirmPassword" 
                        className = "form-control"
                        value = {this.state.confirmPassword}
                        onChange = { this.handleChange}/>
                        </div>
            
                        <button className = "btn btn-primary" type = "submit"> Submit</button>
                        <button 
                        className = "btn btn-danger" 
                        type = "button" 
                        onClick = {this.cancelSubmit}
                        style = {{'margin': '5px'}}> Cancel</button>
                        {error && <div>Error Occured</div>}
                    </form>
                    
                )
            }}
       
        </Mutation>
        )

        if(this.state.loading){
            signpuCom = <Spinner />
        }
        return (
        <div className = "App">
        <h2 className = "App">
        Signup
        </h2>
         { signpuCom }
        </div>
        )
    }
}

export default Signup;