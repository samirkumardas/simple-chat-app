import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { Link } from "react-router-dom";
import validate from './validate';
import InputField from '../render/input';

const signupForm = props => {
    const { handleSubmit, loader } = props;
    const btnLoader = loader ? (<i className="fa fa-spinner fa-spin"></i>) : '';
      
    return (
        <form onSubmit={handleSubmit}>
          <Field
            name="name"
            type="text"
            component={InputField}
            label="Name"
          />
          <Field
            name="email"
            type="text"
            component={InputField}
            label="Email"
          />
          <Field
            name="password"
            type="password"
            component={InputField}
            label="Password"
          />

          <Field
            name="repassword"
            type="password"
            component={InputField}
            label="Confirm Password"
          />
         
          <button className="btn btn-info" type="submit" disabled={loader}>{btnLoader}&nbsp;Submit</button>
          <div className="form-text">
              <br />
              Already have account, <Link to="/">please login</Link>
          </div>
       </form>
    )
};

signupForm.propTypes = {
    loader: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
    form: 'signup',
    validate
})(signupForm);