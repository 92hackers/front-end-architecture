import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'

import {TextField} from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton';

class ContactForm extends Component {

  constructor (props) {
    super(props)
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <section className="wrap">
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" component={TextField} type="text" floatingLabelText="Your first name"/>
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" component={TextField} type="text" floatingLabelText="Your last name"/>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field name="email" component={TextField} type="email" floatingLabelText="Your email"/>
          </div>
          <RaisedButton label="Submit" type="submit" primary={true}></RaisedButton>
        </form>
      </section>
    );
  }

}

// Decorate the form component
ContactForm = reduxForm({
  form: 'contact' // a unique name for this form
})(ContactForm);

export default ContactForm;
