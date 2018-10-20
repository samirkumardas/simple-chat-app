import { call, put, takeLatest } from 'redux-saga/effects';
import connector from '../../utils/connector';

import { setNotice, removeNotice } from '../notice/reducer';
import { showLoader, hideLoader } from '../loader/reducer';
import { signupReq, doLogin } from '../dashboard/reducer';

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
        message: err.message || err.errorDesc,
        type: 'error'
    }));
}


function* workerSignup(action) {
    const name = action.payload.name,
          email = action.payload.email,
          password = action.payload.password;

    try {
        yield call(doPreStuff);
        const data = {
            'act': 'signup',
            'name': name,
            'email': email,
            'password': password
        };
        const response = yield call(connector.request, data);
        yield put(doLogin(response));
        yield call(doPostStuff);
    } catch (err) {
        yield call(doErrorStuff, err);
    }
}

export function* watcherSignup() {
    yield takeLatest(signupReq.getType(), workerSignup);
}