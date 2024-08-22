import React, { Component } from "react";
import Input from "./Input";
import Joi from "joi-browser";

class Login extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.number().required().label("Password"),
  };
  username = React.createRef();

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.account, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
    // const { account } = this.state;
    // if (account.username.trim() === "")
    //   errors.username = "username is required";
    // if (account.password.trim() === "")
    //   errors.password = "password is required";
    // return Object.keys(errors).length === 0 ? null : errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  handleChange = ({ currentTarget: input }) => {
    // validate
    const errorsMessage = this.validateProperty(input);
    const errors = { ...this.state.errors };
    if (errorsMessage) errors[input.name] = errorsMessage;
    else delete errors[input.name];

    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account, errors });
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });

    if (errors) return;
    // call server
    console.log("submitted");
  };

  //   componentDidMount() {
  //     this.username.current.focus();
  //   }
  render() {
    const { account, errors } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            label="Username"
            value={account.username}
            errors={errors.username}
            onChange={this.handleChange}
          />
          <Input
            name="password"
            label="Password"
            value={account.password}
            errors={errors.password}
            onChange={this.handleChange}
          />
          <button className="btn btn-primary">Login</button>
        </form>
      </>
    );
  }
}

export default Login;
