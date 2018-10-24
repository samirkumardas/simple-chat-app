import { call, put, takeLatest } from 'redux-saga/effects';
import connector from '../../utils/connector';
import { storage, getTypeFromKey } from '../../utils/helper';
import CONSTANTS from '../../config/constants';

import { hideLoader } from '../loader/reducer';
import { setNotice } from '../notice/reducer';
import { getMessages, setMessages, sendMessage, addMessage } from '../messenger/reducer';
import { doLogout } from '../dashboard/reducer';

function* doErrorStuff(err) {
    let errorDesc = err.message || err.errorDesc;
    if (errorDesc == 'INVALID_SESSION') {
        errorDesc = 'Your session has been expired. Please login.';
        yield put(hideLoader());
        yield put(doLogout());
    }
    yield put(setNotice({
        message: errorDesc.toString(),
        type: 'error'
    }));
}

/* Fetch messages  */
function* workerGetMessages(action) {
    const token = storage.get(CONSTANTS.AUTH_KEY),
          key = action.payload.key,
          {type, id} = getTypeFromKey(key);
    try {
        const data = {
            'act': 'messages',
            id,
            type,
            token
        };
        /*TODO -- showing message before sending to senver. Ignoring now for the sake of simplicity */
        const response = yield call(connector.request, data);
        yield put(setMessages({
            key,
            messages: response.messages
        }));
    } catch (err) {
        yield call(doErrorStuff, err);
    }
}

export function* watcherGetMessages() {
    yield takeLatest(getMessages.getType(), workerGetMessages);
}

/* send message */
function* workerSendMessage(action) {
    const token = storage.get(CONSTANTS.AUTH_KEY),
          key = action.payload.key,
          content = action.payload.content,
          {type, id} = getTypeFromKey(key);

    try {
        const data = {
            'act': 'message',
            token,
            to: id,
            type,
            content
        };
        const response = yield call(connector.request, data);
        yield put(addMessage({
           message: response
        }));
    } catch (err) {
        yield call(doErrorStuff, err);
    }
}

export function* watcherSendMessage() {
    yield takeLatest(sendMessage.getType(), workerSendMessage);
}