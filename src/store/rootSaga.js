
import { fork, all } from 'redux-saga/effects';
import * as loginSaga from '../components/login/sagas';
import * as signupSaga from '../components/signup/sagas';
import * as dashboardSaga from '../components/dashboard/sagas';

const sagas = {
  ...loginSaga,
  ...signupSaga,
  ...dashboardSaga
}

const forkedSagas = Object.keys(sagas).map(key => fork(sagas[key]));

export default function* rootSaga() {
    yield all(forkedSagas);
}
