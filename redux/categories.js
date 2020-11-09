import * as ActionTypes from './ActionTypes';

export const categories =(state ={categories:[] },action) =>{
    
    switch (action.type){

        case ActionTypes.ADD_CATEGORIES:
            return{...state,errMess: null, categories:action.payload}

        case ActionTypes.ADD_CATEGORY:
            const category = action.payload;
            return {...state, errMess:null, categories:state.categories.concat(category)};
            
        case ActionTypes.CATEGORIES_FAILED:
            return {...state, errMess: action.payload};
        
        default:
            
            return state;
    }
}