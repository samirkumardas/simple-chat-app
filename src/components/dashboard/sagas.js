import { call, put, takeLatest } from 'redux-saga/effects';
import connector from '../../utils/connector';
import { storage } from '../../utils/helper';
import CONSTANTS from '../../config/constants';

import { setNotice, removeNotice } from '../notice/reducer';
import { showLoader, hideLoader } from '../loader/reducer';
import { hideModal } from '../modal/reducer';
import { setDefaultConversation, resetAllConversaions } from '../messenger/reducer';
import { myChannelsReq, membersReq, addChannelReq,
    setMyChannels, setMembers, addChannel, logoutReq, doLogout } from '../dashboard/reducer';

function* doPreStuff() {
    yield put(removeNotice());
    yield put(showLoader());
}

function* doPostStuff() {
    yield put(hideLoader());
}

function* doErrorStuff(err) {
    let errorDesc = err.message || err.errorDesc;
    yield put(hideLoader());
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

/* Fetch channels */
function* workerMyChannels() {
    const token = storage.get(CONSTANTS.AUTH_KEY);
    try {
        yield call(doPreStuff);
        const data = {
            'act': 'channels',
            token
        };
        const response = yield call(connector.request, data);
        yield put(setMyChannels(response.channels));
        /* set default conversation */
        if (response.channels.length > 0) {
            yield put(setDefaultConversation(response.channels[0]));
        }
    } catch (err) {
        yield call(doErrorStuff, err);
    }
}

export function* watcherMyChannels() {
    yield takeLatest(myChannelsReq.getType(), workerMyChannels);
}

/* Fetch members */
function* workerMembers() {
    const token = storage.get(CONSTANTS.AUTH_KEY);
    try {
        yield call(doPreStuff);
        const data = {
            'act': 'members',
            token
        };
        const response = yield call(connector.request, data);
        yield put(setMembers(response.members));
        yield call(doPostStuff);
    } catch (err) {
        yield call(doErrorStuff, err);
    }
}

export function* watcherMembers() {
    yield takeLatest(membersReq.getType(), workerMembers);
}

/* add new channel */
function* workerAddChannel(action) {
    const token = storage.get(CONSTANTS.AUTH_KEY),
          name = action.payload.name,
          purpose = action.payload.purpose,
          members = action.payload.members;

    try {
        yield call(doPreStuff);
        const data = {
            'act': 'add_channel',
            token,
            name,
            purpose,
            members
        };
        const response = yield call(connector.request, data);
        const channel = {
            id: response.id,
            name: response.name,
            owner: response.owner,
            members: response.members
        };
        yield put(addChannel(channel));
        /* set default conversation if it is very first channel */
        yield put(setDefaultConversation(channel));
        yield put(hideModal());
        yield put(setNotice({
            message: 'Channel has been created successfully.',
            type: 'success'
        }));
        yield call(doPostStuff);
    } catch (err) {
        yield call(doErrorStuff, err);
    }
}

export function* watcherAddChannel() {
    yield takeLatest(addChannelReq.getType(), workerAddChannel);
}

/* Logout  */
function* workerLogout() {
    const token = storage.get(CONSTANTS.AUTH_KEY);
    try {
        const data = {
            'act': 'logout',
            token
        };
        const response = yield call(connector.request, data);
        yield put(doLogout(response));
        yield put(resetAllConversaions());
    } catch (err) {
        yield call(doErrorStuff, err);
    }
}

export function* watcherLogout() {
    yield takeLatest(logoutReq.getType(), workerLogout);
}