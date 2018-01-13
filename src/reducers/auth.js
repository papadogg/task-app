import * as ACTION from '../const/actions';

const initialState = {
  loggedIn: false,
  loginError: false
};

const loginSuccess = (state, action) => {
  const newState = {
   ...state,
    loggedIn: true,
    loginError: false
  };
  return newState;
};

const loginFail = (state, action) => {
  const newState = {
   ...state,
    loginError: true
  };
  return newState;
};

const logout = (state, action) => {
  const newState = {
   ...state,
    loggedIn: false,
    loginError: false
  };
  return newState;
};

const hideError = (state, action) => {
  const newState = {
   ...state,
    loginError: false
  };
  return newState;
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.LOGIN_SUCCESS:
      return loginSuccess(state, action);
    case ACTION.LOGIN_FAIL:
      return loginFail(state, action);
    case ACTION.LOGOUT:
      return logout(state, action);
    case ACTION.HIDE_ERROR:
      return hideError(state, action);
    default:
      return state;
  }
};

export default auth;
