import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { aplicationReducer } from './rootReducer';

const store = createStore(aplicationReducer, applyMiddleware(thunk));

export default store;