import { call, put, takeLatest } from 'redux-saga/effects';
import connector from '../../utils/connector';

import { setNotice, removeNotice } from '../notice/reducer';
import { showLoader, hideLoader } from '../loader/reducer';
import { loginReq } from '../dashboard/reducer';

function* doPreStuff() {
    yield put(removeNotice());
    yield put(showLoader());
}


function* doPostStuff() {
    yield put(hideLoader());
}

function* doErrorStuff(err) {
    yield put(hideLoader());
    yield put(setNotice({
        message: err.message || err.error,
        type: 'error'
    }));
}


function* workerLogin(action) {
    const username = action.payload.username,
          password = action.payload.password;

    try {
        yield call(doPreStuff);
        const data = {
            'act': 'login',
            'username': username,
            'password': password
        };
        const response = yield call(connector.request, data);
        alert(response);
        //yield put(insertSlot(response.data.adslots));
        yield call(doPostStuff);
    } catch (err) {
        yield call(doErrorStuff, err);
    }
}

export function* watcherLogin() {
    yield takeLatest(loginReq.getType(), workerLogin);
}