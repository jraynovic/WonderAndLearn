import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { users } from './users';
import { questions } from './questions';
import { categories } from './categories';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            users: users,
            questions: questions,
            categories: categories
        }),
        applyMiddleware(thunk, logger)
        )
        return store;

}