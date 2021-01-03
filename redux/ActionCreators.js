import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const signUp = (newUser) => (dispatch) => {
  dispatch(signUpLoading());
  return fetch(baseUrl + "users/signup", {
    method: "POST",
    body: newUser,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      dispatch(logIn(newUser));
    })
    .catch((error) => {
      dispatch(signUpFailed(error.message));
    });
};

export const signUpFailed = (error) => ({
  type: ActionTypes.SIGN_UP_FAILED,
  payload: error,
});

export const signUpLoading = () => ({
  type: ActionTypes.SIGN_UP_LOADING,
});

export const logIn = (user) => (dispatch) => {
  dispatch(logInLoading());

  return fetch(baseUrl + "users/login", {
    method: "POST",
    body: user,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      const user = response.user;
      user.token = response.token;
      dispatch(setParent(response.user));
    })
    .catch((error) => {
      dispatch(logInFailed(error));
    });
};

export const setParent = (user) => ({
  type: ActionTypes.LOG_IN,
  payload: user,
});

export const logInLoading = () => ({
  type: ActionTypes.LOG_IN_LOADING,
});

export const logInFailed = (error) => ({
  type: ActionTypes.LOG_IN_FAILED,
  payload: error,
});

export const addNewKid = (user) => (dispatch) => {
  dispatch(logInLoading());

  return fetch(baseUrl + `users/${user.id}/kids`, {
    method: "POST",
    body: JSON.stringify(user.kid),
    headers: {
      Authorization: `Bearer ${user.token} `,
      "Content-Type": "application/json",
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      dispatch(addKid(response));
    })
    .catch((error) => {
      alert("Failed" + error);
    });
};

export const addKid = (user) => ({
  type: ActionTypes.ADD_KID,
  payload: user,
});
export const addKidLoading = () => ({
  type: ActionTypes.ADD_KID_LOADING,
});
export const addKidFailed = (error) => ({
  type: ActionTypes.ADD_KID_FAILED,
  payload: error,
});

export const deleteKid = (user, kidId) => (dispatch) => {
  
  return fetch(baseUrl + `users/${user._id}/kids/${kidId}`, {
    method: "DELETE",
    // body: JSON.stringify(user.kid) ,
    headers: {
      Authorization: `Bearer ${user.token} `,
      "Content-Type": "application/json",
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      dispatch(removeKid(response));
    })
    .catch((error) => {
      alert("Failed" + error);
    });
};

export const removeKid = (user) => ({
  type: ActionTypes.REMOVE_KID,
  payload: user,
});
export const removeKidLoading = () => ({
  type: ActionTypes.REMOVE_KID_LOADING,
});
export const removeKidFailed = (error) => ({
  type: ActionTypes.REMOVE_KID_FAILED,
  payload: error,
});

export const addNewChallenge = (user, kidId, category) => (dispatch) => {

  return fetch(baseUrl + `users/${user._id}/kids/${kidId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token} `,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(category),
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      response.token = user.token;
      dispatch(addChallenge(response));
    })
    .catch((error) => {
      alert("Failed" + error);
    });
};

export const addChallenge = (user) => ({
  type: ActionTypes.ADD_CHALLENGE,
  payload: user,
});
export const addChallengeLoading = () => ({
  type: ActionTypes.ADD_CHALLENGE_LOADING,
});
export const addChallengeFailed = (error) => ({
  type: ActionTypes.ADD_CHALLENGE_FAILED,
  payload: error,
});

export const deleteChallenge = (user, kidId, categoryId, kid) => (dispatch) => {
  setSelectedKid(kid);
  return fetch(baseUrl + `users/${user._id}/kids/${kidId}/${categoryId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${user.token} `,
      "Content-Type": "application/json",
    },
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      response.token = user.token;
      dispatch(deleteUserChallenge(response));
    })
    .catch((error) => {
      alert("Failed" + error);
    });
};

export const deleteUserChallenge = (user) => ({
  type: ActionTypes.DELETE_CHALLENGE,
  payload: user,
});

export const setSelectedKid = (kid) => (dispatch) => {
  dispatch(setKid(kid));
};

export const setKid = (kid) => ({
  type: ActionTypes.SELECT_KID,
  payload: kid,
});

export const addNewQuestionKid = (
  userId,
  kidId,
  challengeId,
  question,
  user
) => (dispatch) => {
  return fetch(baseUrl + `users/${userId}/kids/${kidId}/${challengeId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token} `,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(question),
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      dispatch(addNewQuestion(response));
    })
    .catch((error) => {
      alert("Failed" + error);
    });
};

export const addNewQuestion = (user) => ({
  type: ActionTypes.ADD_NEW_QUESTION,
  payload: user,
});
export const addQuestionLoading = () => ({
  type: ActionTypes.ADD_KID_LOADING,
});
export const addQuestionFailed = (error) => ({
  type: ActionTypes.ADD_KID_FAILED,
  payload: error,
});

export const deleteQuestionKid = (
  user,
  kidId,
  challengeId,
  questionId,
  question
) => (dispatch) => {
  return fetch(
    baseUrl +
      `users/${user.parent._id}/kids/${kidId}/${challengeId}/${questionId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token} `,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    }
  )
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      response.token = user.token;
      dispatch(deleteQuestion(response));
    })
    .catch((error) => {
      alert("Failed" + error);
    });
};

export const deleteQuestion = (user) => ({
  type: ActionTypes.ADD_NEW_QUESTION,
  payload: user,
});

export const deleteQuestionLoading = () => ({
  type: ActionTypes.ADD_KID_LOADING,
});

export const deleteQuestionFailed = (error) => ({
  type: ActionTypes.ADD_KID_FAILED,
  payload: error,
});

export const editQuestionKid = (
  user,
  kidId,
  challengeId,
  questionId,
  question
) => (dispatch) => {
 
  return fetch(
    baseUrl +
      `users/${user.parent._id}/kids/${kidId}/${challengeId}/${questionId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user.token} `,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    }
  )
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      response.token = user.token;
      dispatch(deleteQuestion(response));
    })
    .catch((error) => {
      alert("Failed" + error);
    });
};

export const updateLastAccessed = (user, kidId, challengeId, lastAccessed) => (
  dispatch
) => {
  return fetch(
    baseUrl + `users/${user.parent._id}/kids/${kidId}/${challengeId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${user.token} `,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lastAccessed),
    }
  )
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        throw error;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      response.token = user.token;
      dispatch(deleteQuestion(response));
    })
    .catch((error) => {
      alert("Failed" + error);
    });
};
