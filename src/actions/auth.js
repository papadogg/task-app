import * as ACTION from '../const/actions';
import * as AUTH from '../const/auth';


export const login = (username, password) => {
  if (username === AUTH.LOGIN && password === AUTH.PASSWORD) {
    return {
       type: ACTION.LOGIN_SUCCESS
     };
  }
  return {
    type: ACTION.LOGIN_FAIL
  };
};

export const logout = () => {
  return {
    type: ACTION.LOGOUT
  };
};

export const hideError = () => {
  return {
    type: ACTION.HIDE_ERROR
  };
};
