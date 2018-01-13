import * as ACTION from '../const/actions';

const initialState = {
  taskList: [],
  totalPages: 1,
  sortField: 'username',
  direction: 'asc',
  page: 1,
  loading: false
};

const fetchTasks = (state, action) => {
  const newState = {
   ...state,
    taskList: action.payload.tasks,
    totalPages: Math.ceil(action.payload.total_task_count / 3)
  };
  return newState;
};

const setPage = (state, action) => {
  const newState = {
   ...state,
   page: action.payload
  };
  return newState;
};

const sortBy = (state, action) => {
  const newState = {
   ...state,
   sortField: action.payload.sortField,
   direction: action.payload.direction
  };
  return newState;
};

const setLoading = (state, action) => {
  const newState = {
   ...state,
   loading: action.payload
  };
  return newState;
}

const tasks = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.FETCH_TASKS:
      return fetchTasks(state, action);
    case ACTION.SET_PAGE:
      return setPage(state, action);
    case ACTION.SORT_BY:
      return sortBy(state, action);
    case ACTION.LOADING:
      return setLoading(state, action);
    default:
      return state;
  }
};

export default tasks;
