import React from "react";
import Form from "./Form";
import Joi from "joi-browser";

class Register extends Form{

    state = {
        data: { username: "", password: "", name: "" },
        errors: {}
    }

    schema = {
        username: Joi.string().email().required().label("Username"),
        password: Joi.number().min(20).required().label("Password"),
        name: Joi.string().required().label('Name')
    }

    doSubmit = () => {
        console.log('submitted', this);
        
    }

    render(){
        return(
        <>
            <form onSubmit={this.handleSubmit}>
            {this.returnInput('username', 'Username')}
            {this.returnInput('password', 'Password', 'password')}
            {this.returnInput('name', 'Name')}
            {this.returnButton('Register')}
            </form>
        </>
        )
    }
}

export default Register