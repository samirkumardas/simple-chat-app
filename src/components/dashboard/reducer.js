import { createAction, createReducer } from 'redux-act';
import { fromJS } from 'immutable';
import { cookie } from '../../utils/helper';
import CONSTANTS from '../../config/constants';


export const check_authentication =  createAction('CHECK_AUTHENTICATION');
export const changeLoginState =  createAction('CHANGE_LOGIN_STATE');
export const loginReq =  createAction('LOGIN_REQ');
export const signupReq =  createAction('SIGNUP_REQ');

const getLoginState = () => !!cookie.get(CONSTANTS.AUTH_COOKIE);

const initialState = fromJS({
    loginState: getLoginState()
});

const account = createReducer({
    [changeLoginState]: (state, payload) => state.set('loginState', payload)
}, initialState);

export default account;