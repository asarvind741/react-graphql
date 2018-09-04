import React from 'react';
import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from '../../queries/index';
import Spinner from '../UI/Spinner/Spinner';
import { withRouter } from 'react-router-dom';
class Signup extends React.Component {

    state = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        loading : false,
        error: null
    }

    clearState = () => {
        this.setState({
            username: '',
            email: '',
            password: '',
            confirmPassword: ''
        })
    }
    onSignupSubmit =(event, signupUser) => {
        this.setState({
            loading: true
        })
        event.preventDefault();
       
        signupUser().then(async(data) => {
            this.setState({
                loading: false
            })
            await this.props.refetch();
            this.clearState();

        })
        .catch((err) => {
            this.setState({
                loading: false,
                error:err.message
            })
            this.clearState()
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

    validateForm = () => {
        const { username, email, password, confirmPassword } = this.state;

        const isInvalid = !username || !email || !password || !confirmPassword
        || password !== confirmPassword

        return isInvalid;
    }
    
    render(){

        const { username, email, password, confirmPassword } = this.state;
        let signpuCom = (
            <Mutation mutation = { SIGNUP_USER } variables = {{ username, email, password}}>


            {(signupUser, {data, loading, error}) => {
                console.log("data", data);
                console.log("err", error);
                
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
            
                        <button 
                        disabled = { loading || this.validateForm()}
                        className = "btn btn-primary" 
                        type = "submit"> Submit</button>
                        <button 
                        className = "btn btn-danger" 
                        type = "button" 
                        onClick = {this.cancelSubmit}
                        style = {{'margin': '5px'}}> Cancel</button>
                        {this.state.error? <p>{this.state.error}</p>:''}
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

export default withRouter(Signup);