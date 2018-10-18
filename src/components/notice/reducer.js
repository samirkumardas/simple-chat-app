import { createAction, createReducer } from 'redux-act';
import { fromJS } from 'immutable';

export const setNotice =  createAction('SET_NOTICE');
export const removeNotice =  createAction('REMOVE_NOTICE');

const initialState = fromJS({
        message: '',
        type: ''
});

const notice = createReducer({
    [setNotice]: (state, payload) => state.set('message', payload.message).set('type', payload.type),
    [removeNotice]: (state) => state.set('message', '').set('type', '')
}, initialState);

export default notice;