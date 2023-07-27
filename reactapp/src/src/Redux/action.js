// actions.js
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

export const loginSuccess = (email) => {
  return {
    type: LOGIN_SUCCESS,
    payload: email,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
  };
};
