import * as ActionTypes from './ActionTypes';

export const questions =(state ={questions:[] },action) =>{
    
    switch (action.type){

        case ActionTypes.ADD_QUESTIONS:
            
            return{...state,errMess: null, questions:action.payload}

        case ActionTypes.ADD_QUESTIONS:
            return{...state,errMess: null, questions:state.categories.concat(action.payload)}
            
        case ActionTypes.QUESTIONS_FAILED:
            return {...state, errMess: action.payload};

        default:
            return state;
    }
}

