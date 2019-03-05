import React from 'react';
import { Field, reduxForm as formCreate } from 'redux-form';


class StreamForm extends React.Component {

    renderError({ error, touched }) {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            )
        }
    }

    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>

        )
    }

    onSubmit = (fromValues) => {
        this.props.onSubmit(fromValues);
    }

    render() {

        return (
            <form
                onSubmit={this.props.handleSubmit(this.onSubmit)}
                className="ui form error"
            >
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (fromValues) => {
    const errors = {};
    if (!fromValues.title) {
        errors.title = 'Please enter a title :)';
    }
    if (!fromValues.description) {
        errors.description = 'Please enter a description :)';
    }
    return errors;
}

export default formCreate({
    form: 'streamForm',
    validate: validate
})(StreamForm);

