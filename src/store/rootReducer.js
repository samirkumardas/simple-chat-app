import { combineReducers } from 'redux-immutable';
import { reducer as form } from 'redux-form/immutable';

import account from '../components/dashboard/reducer';
import channels from '../components/conversations/reducer';
import loader from '../components/loader/reducer';
import notice from '../components/notice/reducer';

export default combineReducers({
    account,
    channels,
    loader,
    notice,
    form
});
