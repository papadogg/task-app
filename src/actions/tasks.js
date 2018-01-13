import axios from 'axios';
import CryptoJS from 'crypto-js';
import * as ACTION from '../const/actions';

export const setPage = (page) => {
  return {
    type: ACTION.SET_PAGE,
    payload: page
  };
};

export const sortBy = (sortField, direction) => {
  return {
    type: ACTION.SORT_BY,
    payload: {
      sortField,
      direction
    }
  };
};

export const fetchTasks = () => {
  return (dispatch, getState) => {
    dispatch({
      type: ACTION.LOADING,
      payload: true
    });
    const { sortField, direction, page } = getState().tasks;
    axios.get(`https://uxcandy.com/~shapoval/test-task-backend/?sort_field=${sortField}&sort_direction=${direction}&page=${page}&developer=vsorochuk`)
    .then(res => {
      dispatch({
        type: ACTION.LOADING,
        payload: false
      });
      dispatch({
        type: ACTION.FETCH_TASKS,
        payload: res.data.message
      });
    }).catch(e => {
      console.log(e);
      dispatch({
        type: ACTION.LOADING,
        payload: false
      });
    });
  };
};

export const createNewTask = (task) => {
  return dispatch => {
    dispatch({
      type: ACTION.LOADING,
      payload: true
    });
    const form = new FormData();
    form.append('username', task.username);
    form.append('email', task.email);
    form.append('text', task.text);
    form.append('image', task.image);
    axios.post('https://uxcandy.com/~shapoval/test-task-backend/create?developer=vsorochuk', form)
    .then(res => {
      dispatch(fetchTasks());
    }).catch(e => {
      console.log(e);
      dispatch({
        type: ACTION.LOADING,
        payload: false
      });
    });
  };
};

export const editTask = (task) => {
  return dispatch => {
    dispatch({
      type: ACTION.LOADING,
      payload: true
    });
    const { id, text, status } = task;
    const params_string = `status=${status}&text=${text}&token=beejee`;
    const hash = CryptoJS.MD5(encodeURI(params_string)).toString();
    const form = new FormData();
    form.append('text', task.text);
    form.append('status', task.status);
    form.append('token', 'beejee');
    form.append('signature', hash);
    axios.post(`https://uxcandy.com/~shapoval/test-task-backend/edit/${id}?developer=vsorochuk`, form)
    .then(res => {
      dispatch(fetchTasks());
    }).catch(e => {
       console.log(e);
       dispatch({
         type: ACTION.LOADING,
         payload: false
       });
    });
  };
};
