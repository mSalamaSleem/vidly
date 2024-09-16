import React from "react";
import Form from "./Form";
import Joi from "joi-browser";

class Login extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.number().required().label("Password"),
  };
  

  doSubmit = () => {
    console.log('submitted');
    
  }

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          {this.returnInput('username', 'Username')}
          {this.returnInput('password', 'Password', 'password')}
          {this.returnButton('Login')}
        </form>
      </>
    );
  }
}

export default Login;
