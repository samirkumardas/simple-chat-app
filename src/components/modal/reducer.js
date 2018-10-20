import { createAction, createReducer } from 'redux-act';

export const showModal =  createAction('SHOW_MODAL');
export const hideModal =  createAction('HIDE_MODAL');

const initialState = false;
const modal = createReducer({
    [showModal]: () => true,
    [hideModal]: () => false
}, initialState);

export default modal;