import { createStore } from 'redux';
import Reducer from './../reducers';
// import logger from 'redux-logger'

// export const store = createStore(Reducer, applyMiddleware(logger))

export const store = createStore(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());