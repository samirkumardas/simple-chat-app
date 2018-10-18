import { createAction, createReducer } from 'redux-act';

export const showLoader =  createAction('SHOW_LOADER');
export const hideLoader =  createAction('HIDE_LOADER');

const initialState = false;
const loader = createReducer({
    [showLoader]: () => true,
    [hideLoader]: () => false
}, initialState);

export default loader;