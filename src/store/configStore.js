import 'regenerator-runtime/runtime';
import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
import rootReducer from './rootReducer';
import Logger from '../middlewares/logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];


if (process.env.NODE_ENV !== 'production') {
  middlewares.push(Logger);
}

 /* eslint-disable no-underscore-dangle */
const composeEnhancers = process.env.NODE_ENV !== 'production'
    && typeof window === 'object'
    && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;
  /* eslint-enable */

const configStore = (initialState={}) => {
    const store = createStore(
        rootReducer,
        fromJS(initialState),
        composeEnhancers(applyMiddleware(...middlewares))
    );

    sagaMiddleware.run(rootSaga);
    return store;
};

export default configStore;