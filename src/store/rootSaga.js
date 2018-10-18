
import { fork, all } from 'redux-saga/effects';
import * as loginSaga from '../components/login/sagas';
import * as signupSaga from '../components/signup/sagas';

const sagas = {
  ...loginSaga,
  ...signupSaga
}

const forkedSagas = Object.keys(sagas).map(key => fork(sagas[key]));

export default function* rootSaga() {
    yield all(forkedSagas);
}
