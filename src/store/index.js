import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import schoolReducer from './reducers';

const rootReducer = combineReducers({
    schoolReducer
})

export const Store = createStore(rootReducer, applyMiddleware(thunk));