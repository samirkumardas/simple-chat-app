import { createAction, createReducer } from 'redux-act';
import { fromJS } from 'immutable';
import { storage } from '../../utils/helper';
import CONSTANTS from '../../config/constants';

/* Request action */
export const loginReq =  createAction('LOGIN_REQ');
export const signupReq =  createAction('SIGNUP_REQ');
export const myChannelsReq =  createAction('MY_CHANNELS_REQ');
export const membersReq =  createAction('MEMBERS_REQ');
export const addChannelReq =  createAction('ADD_CHANNEL_REQ');

/* Setter actions */
export const doLogin =  createAction('DO_LOGIN');
export const doLogout =  createAction('DO_LOGOUT');
export const setMyChannels =  createAction('SET_MY_CHANNELS');
export const setMembers =  createAction('SET_MEMMBERS');
export const addChannel =  createAction('ADD_CHANNEL');

const getLoginState = () => !!storage.get(CONSTANTS.AUTH_KEY);
const doLoginAction = (state, payload) => {
    storage.set(CONSTANTS.AUTH_KEY, payload.token);
    storage.set(CONSTANTS.USER_NAME, payload.name);
    state = state.merge({'loginState':true, userName: payload.name, userId: payload.id});
    return state;
};
const doLogoutAction = (state) => {
    storage.remove(CONSTANTS.AUTH_KEY);
    state = state.merge({'loginState':false, userName: '', userId: ''});
    return state;
};

const initialState = fromJS({
    loginState: getLoginState(),
    userName: storage.get(CONSTANTS.USER_NAME) || '',
    userId: '',
    members: [],
    channels: []
});

const account = createReducer({
    [doLogin]: (state, payload) => doLoginAction(state, payload),
    [doLogout]: (state, payload) => doLogoutAction(state, payload),
    [setMyChannels]: (state, payload) => state.set('channels', fromJS(payload)),
    [setMembers]: (state, payload) => state.set('members', fromJS(payload)),
    [addChannel]: (state, payload) => state.update('channels', channels => channels.push(payload)),
}, initialState);

export default account;