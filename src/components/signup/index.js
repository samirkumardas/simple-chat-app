import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import SignupForm from '../form/signup';
import Notice from '../notice';
import styles from './signup.css';

import { signupReq } from '../dashboard/reducer';


class Signup extends Component {
  
    onSubmit = (values) => {
        this.props.dispatch(signupReq({
            name: values.get('name'),
            email: values.get('email'),
            password: values.get('password')
        }));
    }

    render() {
        if (this.props.loginState) return <Redirect to="/messages" />;
        
        return (
          <div className="d-flex align-items-center h-100">
            <Notice />
            <div className={styles.signupForm}>
              <div className="card">
                  <div className="card-header">
                    <i className="fas fa-lock"></i>&nbsp;Please enter details to register!
                  </div>
                  <div className="card-body">
                   <SignupForm onSubmit = {this.onSubmit} loader = {this.props.loader} />
                  </div>
                </div>
             </div>
          </div>
       )
    }
}

const mapStateToProps = (state) => {
    return {
        loader: state.get('loader'),
        loginState: state.getIn(['account', 'loginState'])
    };
};

Signup.propTypes = {
    loginState: PropTypes.bool,
    loader: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps, dispatch => ({dispatch}))(Signup);