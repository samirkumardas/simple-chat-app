import { call, put, takeLatest } from 'redux-saga/effects';
import connector from '../../utils/connector';
//import { fetchSlotsReq, slotSaveReq, slotDetailReq, insertSlot, setSlot, slotDetailSuccess } from './reducer';
//import { showLoader, hideLoader } from '../loader/reducer';
import { hideSlotForm } from '../adslots/reducer';
//import { getAPIRequestHeader } from 'utils/helper';

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
        message: err.message,
        type: 'error'
    }));
}

/* fetch slots list */
function* workerFetchSlots() {
  const requestURL = CONSTANTS.SERVER_URL +  CONSTANTS.API_REQUEST.ADSLOT;
  try {
    yield call(doPreStuff);
    const response = yield call(request, requestURL);
    yield put(insertSlot(response.data.adslots));
    yield call(doPostStuff);
  } catch (err) {
    yield call(doErrorStuff,err);
  }
}

export function* watcherFetchSlots() {
  yield takeLatest(fetchSlotsReq.getType(), workerFetchSlots);
}

/* Fetch slot detail*/
function* workerFetchSlotDetail(action) {
  const requestURL = CONSTANTS.SERVER_URL + CONSTANTS.API_REQUEST.ADSLOT + action.payload;
  try {
    yield call(doPreStuff);
    const response = yield call(request, requestURL);
    yield put(slotDetailSuccess(response.data.adslot));
    yield call(doPostStuff);
  } catch (err) {
    yield call(doErrorStuff,err);
  }
}

export function* watcherFetchSlotDetail() {
  yield takeLatest(slotDetailReq.getType(), workerFetchSlotDetail);
}

/* edit OR add slot */
function* workerSaveSlot(action) {
  const payload = action.payload.data,
        id = action.payload.id,
        requestURL = CONSTANTS.SERVER_URL + CONSTANTS.API_REQUEST.ADSLOT + (id ? id : ''),
        options = getAPIRequestHeader(payload, id);
  try {
    yield call(doPreStuff);
    const response = yield call(request, requestURL, options);
    yield put(setSlot(response && response.data.adslot ? response.data.adslot : {...payload, id}));
    yield call(doPostStuff);
    yield put(setNotice({
        message: 'Adslot has been saved successfully.',
        type: 'notice'
    }));
    yield put(hideSlotForm());
  } catch (err) {
    yield call(doErrorStuff,err);
  }
}

export function* watcherSaveSlot() {
  yield takeLatest(slotSaveReq.getType(), workerSaveSlot);
}