import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import axios from 'axios';

const server = 'http://localhost:5001/'

export const fetchQuestions = () => dispatch => {
 
    return fetch(baseUrl+'questions')
        .then(response => {
                if (response.ok) {
                return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(questions => dispatch(addQuestions(questions)))
        // .catch(error => dispatch(questionsFailed(error.message)));
};
export const fetchQuestionsByCategory = (category) => dispatch => {
    return fetch(baseUrl+category)
        .then(response => {
                if (response.ok) {
                return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(questions => dispatch(addQuestions(questions)))
        // .catch(error => dispatch(questionsFailed(error.message)));
};

export const questionsFailed = errMess => ({
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMess
});

export const addQuestions = (questions) => ({
    type: ActionTypes.ADD_QUESTIONS,
    payload: questions
})

export const fetchCategories = () => dispatch => {
    return fetch(baseUrl + 'categories')
        .then(response => {
                if (response.ok) {
                return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(categories => dispatch(addCategories(categories)))
        // .catch(error => dispatch(questionsFailed(error.message)));
};

export const addCategories = (categories) => ({
    type: ActionTypes.ADD_CATEGORIES,
    payload: categories
})

export const addCategory = (category) => ({
    type: ActionTypes.ADD_CATEGORY,
    payload: category
})

export const postCategory = (id,category) => (dispatch) => {
    const newCategory = {id, category}
    return fetch(baseUrl + 'categories', {
        method: "POST",
        body: JSON.stringify(newCategory),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; }
    )
    .then(response => response.json())
    .then(response => dispatch(addCategory(response)))
    .catch(error => {
        // console.log('post category', error.message);
        alert('Your category could not be posted\nError: ' + error.message);
    });
};

export const addQuestion = (question) => ({
    type: ActionTypes.ADD_QUESTION,
    payload: question
})

export const postQuestion = (category,question) => (dispatch) => {

    
    return fetch(baseUrl +category, {
        method: "POST",
        body: JSON.stringify(question),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; }
    )
    .then(response => response.json())
    // .then(response => dispatch(addQuestion(response,category)))
    .catch(error => {
        console.log('post question', error.message);
        alert('Your question could not be posted\nError: ' + error.message);
    });
};

export const postNewCategory = (category) => (dispatch) => {

    
    return fetch(baseUrl +category, {
        method: "PUT",
        // body: JSON.stringify(question),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; }
    )
    .then(response => response.json())
    // .then(response => dispatch(addQuestion(response,category)))
    .catch(error => {
        console.log('post question', error.message);
        alert('Your question could not be posted\nError: ' + error.message);
    });
};


export const fetchUsers = () => dispatch => { 
    return fetch(baseUrl+'users')
        .then(response => {
                if (response.ok) {
                return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(users => dispatch(addUsers(users)))
        // .catch(error => dispatch(usersFailed(error.message)));
};

export const addUsers = (users) => ({
    type: ActionTypes.ADD_USERS,
    payload: users
})

export const postUser = (id,user) => (dispatch) => {
    const newUser = {id, user}
    return fetch(baseUrl + 'users', {
        method: "POST",
        body: JSON.stringify(newUser),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; }
    )
    .then(response => response.json())
    .then(response => dispatch(addUser(response)))
    .catch(error => {
        console.log('post user', error.message);
        alert('Your user could not be posted\nError: ' + error.message);
    });
};

export const addUser = (user) => ({
    type: ActionTypes.ADD_USER,
    payload: user
})

export const signUp = (newUser) => (dispatch) => {

    dispatch(signUpLoading())
    console.log('******************',newUser)
    return fetch(baseUrl+'users/signup', {
        method: "POST",
        body: newUser,
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
            
            if (response.ok) {
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                console.log('here*****************************************************')
                console.log(JSON.stringify(error.response))
                throw error;
            }
        },
        error => { 
            
            throw error; }
    )
    .then(response => response.json())
    .then(response => {
        alert('We made it here!')
        dispatch(logIn(newUser))
    })
    .catch(error => {
        // console.log(JSON.stringify(error.message));
        dispatch(signUpFailed(error.message))
    });
};

export const signUpFailed= (error)=>({
    type: ActionTypes.SIGN_UP_FAILED,
    payload: error
})

export const signUpLoading= ()=>({
    type: ActionTypes.SIGN_UP_LOADING
})

export const logIn = (user) => (dispatch) => {
    
    dispatch(logInLoading())
    //axios.post(baseUrl + 'users/login',{username:user.username,password: user.password})
    console.log('ATTEMPTING LOGIN****************************************************************************************')
    console.log(user)
    return fetch(baseUrl + 'users/login', {
        method: "POST",
        body: user,
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        
            if (response.ok) {
                
                return response;
            } else {
                const error = new Error(`Error ${response.status}: ${response.statusText}`);
                error.response = response;
                throw error;
            }
        },
        error => { throw error; }
    )
    .then(response => response.json())
    .then(response => {
        console.log('TOKEN**********************************************************',response.token)
        const user = response.user
        user.token =response.token
        dispatch(setParent(response.user))})
    .catch(error => {
        dispatch(logInFailed(error))
        alert('Your user could not log in: ' + error.message);
    });
};

export const setParent = (user) => ({
    type: ActionTypes.LOG_IN,
    payload: user
})

export const logInLoading= ()=>({
    type: ActionTypes.LOG_IN_LOADING
})

export const logInFailed= (error)=>({
    type: ActionTypes.LOG_IN_FAILED,
    payload: error,
})