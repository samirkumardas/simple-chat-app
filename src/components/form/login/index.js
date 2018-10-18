import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form/immutable';
import { Link } from "react-router-dom";
import validate from './validate';
import InputField from '../render/input';

const LoginForm = props => {
    const { handleSubmit, loader } = props;
    const btnLoader = loader ? (<i className="fa fa-spinner fa-spin"></i>) : '';
      
    return (
        <form onSubmit={handleSubmit}>
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
         
          <button className="btn btn-info" type="submit" disabled={loader}>{btnLoader}&nbsp;Submit</button>
          <div className="form-text">
              <br />
              Don&apos;t have account, <Link to="/signup">please register </Link>
          </div>
       </form>
    )
};

LoginForm.propTypes = {
    loader: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired
};

export default reduxForm({
    form: 'login',
    validate
})(LoginForm);