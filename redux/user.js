import * as ActionTypes from './ActionTypes';

export const user =(state={parent :{},kids:[] ,token:'',pin:0,errMess:null, loading:false, selectedKid:{} },action) =>{

    switch (action.type){

        // case ActionTypes.ADD_USERS:
        //     return{...state,errMess: null, users:action.payload}
        
        // case ActionTypes.ADD_USER:
        //     return {...state, errMess: null,users: state.users.concat(action.payload)}

        case ActionTypes.SET_PARENT:
            const user = action.payload;
            alert(user.kids)
            return {...state, errMess: null,loading: false, parent: action.payload,kids:user.kids}
        
        case ActionTypes.SIGN_UP_LOADING:
            return {...state, errMess: null, loading: true }

        case ActionTypes.SIGN_UP_FAILED:
            return {...state, errMess: action.payload,loading: false  }
        
        case ActionTypes.LOG_IN:
            return {...state, errMess:null ,loading: false,parent: action.payload, kids:  action.payload.kids,id:action.payload._id, token:action.payload.token, pin:action.payload.pin}

        case ActionTypes.LOG_IN_LOADING:
            return {...state, errMess: null, loading: true }
        
        case ActionTypes.LOG_IN_FAILED:
            return {...state, errMess: action.payload,loading: false  }
        
        case ActionTypes.ADD_KID:
            const newParent = state.parent
            newParent.kids = action.payload
            return {...state, errMess:null ,loading: false,kids: action.payload, parent:newParent}

        case ActionTypes.REMOVE_KID:
            //find index of kid in state.kids
            return {...state, errMess:null ,loading: false,kids: action.payload}

        case ActionTypes.ADD_CHALLENGE:
            return {...state, errMess:null ,loading: false,parent:action.payload, kids:action.payload.kids }

        case ActionTypes.DELETE_CHALLENGE:
            const kid = action.payload.kids
            const newParental = action.payload
            return {...state, errMess:null ,loading: false,parent:newParental,kids:kid }

        case ActionTypes.SELECT_KID:
            return{...state, errMess:null, loading: false, selectedKid:action.payload}

        case ActionTypes.ADD_NEW_QUESTION:
            return{...state, errMess:null, loading: false, parent:action.payload,kids:action.payload.kids}

        default:
            return state;
    }
}
