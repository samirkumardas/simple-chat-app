import { call, put, takeLatest } from 'redux-saga/effects';
import connector from '../../utils/connector';
import { storage, getTypeFromKey } from '../../utils/helper';
import CONSTANTS from '../../config/constants';

import { setNotice } from '../notice/reducer'; //removeNotice
//import { showLoader, hideLoader } from '../loader/reducer';
//import { hideModal } from '../modal/reducer';
import { getMessages, setMessages, sendMessage, addMessage } from '../messenger/reducer';
import { doLogout } from '../dashboard/reducer';

/*
function* doPreStuff() {
    yield put(removeNotice());
    yield put(showLoader());
}

function* doPostStuff() {
    yield put(hideLoader());
} */

function* doErrorStuff(err) {
    let message = err.message || err.errorDesc;
    //yield put(hideLoader());
    if (message == 'INVALID_SESSION') {
        message = 'Your session has been expired. Please login.';
        yield put(doLogout());
    }
    yield put(setNotice({
        message,
        type: 'error'
    }));
}

/* Fetch messages  */
function* workerGetMessages(action) {
    const token = storage.get(CONSTANTS.AUTH_KEY),
          key = action.payload.key,
          {type, id} = getTypeFromKey(key);
    try {
        //yield call(doPreStuff);
        const data = {
            'act': 'messages',
            id,
            type,
            token
        };
        const response = yield call(connector.request, data);
        yield put(setMessages({
            key,
            messages: response.messages
        }));
        //yield call(doPostStuff);
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
        //yield call(doPreStuff);
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
        //yield call(doPostStuff);
    } catch (err) {
        yield call(doErrorStuff, err);
    }
}

export function* watcherSendMessage() {
    yield takeLatest(sendMessage.getType(), workerSendMessage);
}