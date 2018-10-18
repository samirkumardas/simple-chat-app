const logger = store => next => action => {
    const result = next(action);
    /*eslint-disable */
    console.log('%c DISPATCHING      :: ', 'color: green', action);
    console.log('%c NEXT STATE       :: ', 'color: green', store.getState());
    /*eslint-disable */
    return result;
}

export default logger;
