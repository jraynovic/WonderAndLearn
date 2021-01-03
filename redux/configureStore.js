import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { user } from './user';
// import { questions } from './questions';
import { categories } from './categories';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            user: user,
            categories: categories
        }),
        applyMiddleware(thunk, logger)
        )
        return store;

}