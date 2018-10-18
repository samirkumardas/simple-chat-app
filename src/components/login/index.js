import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LoginForm from '../form/login';
import Notice from '../notice';
import styles from './login.css';

import { loginReq } from '../dashboard/reducer';

class Login extends Component {
  
    onSubmit = (values) => {
        this.props.dispatch(loginReq({
            username: values.get('email'),
            password: values.get('password')
        }));
    }

    render() {
        if (this.props.loginState) return <Redirect to="/messages" />;

        return (
          <div className="d-flex align-items-center h-100">
             <Notice />
              <div className={styles.loginForm}>
                <div className="card">
                    <div className="card-header">
                     <i className="fas fa-lock"></i>&nbsp;Please enter your login details.
                    </div>
                    <div className="card-body">
                      <LoginForm onSubmit = {this.onSubmit} loader = {this.props.loader} />
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

Login.propTypes = {
    loginState: PropTypes.bool,
    loader: PropTypes.bool,
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps, dispatch => ({dispatch}))(Login);