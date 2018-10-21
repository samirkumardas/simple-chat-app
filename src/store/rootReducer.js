import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';

import account from '../components/dashboard/reducer';
import loader from '../components/loader/reducer';
import modal from '../components/modal/reducer';
import notice from '../components/notice/reducer';
import messenger from '../components/messenger/reducer';

export default combineReducers({
    account,
    loader,
    modal,
    notice,
    form,
    messenger
});