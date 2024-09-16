import { Component } from 'react'
import Joi from "joi-browser";
import Input from './Input';
import Selection from './Selection';

class Form extends Component {
    state = {
        data: {},
        errors: {},
    };
    //   username = React.createRef();

    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.data, this.schema, options);
        if (!error) return null;

        const errors = {};
        for (let item of error.details) {
            errors[item.path[0]] = item.message;
        }
        return errors;
        // const { data } = this.state;
        // if (data.username.trim() === "")
        //   errors.username = "username is required";
        // if (data.password.trim() === "")
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
        
        const data = { ...this.state.data };
        data[input.name] = input.value;
        this.setState({ data, errors });
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });

        if (errors) return;
        // call server
        this.doSubmit()
    };

    returnInput = (name, label, type='text') => {
        const { data, errors } = this.state;
        return(<Input
            name={name}
            label={label}
            type={type}
            value={data[name]}
            errors={errors[name]}
            onChange={this.handleChange}
          />)
    };
    returnSelection =(name, label, options) =>{
        const {data, errors} = this.state
        return (
            <Selection
                name={name}
                value={data[name]}
                label={label}
                options={options}
                onChange={this.handleChange}
                errors={errors[name]}
            />
        )
    };
    returnButton = (label) => {
        return(<button disabled={this.validate()} className="btn btn-primary">{label}</button>)
    };
}

export default Form;