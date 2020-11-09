import * as ActionTypes from './ActionTypes';

export const users =(state={users : [ ], parent :{} ,errMess:null, loading:false },action) =>{

    switch (action.type){

        case ActionTypes.ADD_USERS:
            return{...state,errMess: null, users:action.payload}
        
        case ActionTypes.ADD_USER:
            return {...state, errMess: null,users: state.users.concat(action.payload)}

        case ActionTypes.SET_PARENT:
            return {...state, errMess: null,loading: false, parent: action.payload}
        
        case ActionTypes.SIGN_UP_LOADING:
            return {...state, errMess: null, loading: true }

        case ActionTypes.SIGN_UP_FAILED:
            return {...state, errMess: action.payload,loading: false  }
        
        case ActionTypes.LOG_IN:
            return {...state, errMess:null ,loading: false,parent: action.payload }
        
        case ActionTypes.LOG_IN_LOADING:
            return {...state, errMess: null, loading: true }
        
        case ActionTypes.LOG_UP_FAILED:
            return {...state, errMess: action.payload,loading: false  }

        default:
            return state;
    }
}
