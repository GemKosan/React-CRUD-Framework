import streams from '../apis/streams';
import history from '../history';
import * as types from './types';

export const signIn = (userId) => {
  return {
    type: types.SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: types.SIGN_OUT
  };
};

export const createStream = formValues => async (dispatch, getState) => {
  const { userId } = getState().auth;
  const response = await streams.post('/streams', { ...formValues, userId });

  dispatch({ type: types.CREATE_STREAM, payload: response.data});
  history.push('/');
};

export const fetchStreams = () => async dispatch => {
  const response = await streams.get('/streams');

  dispatch({type: types.FETCH_STREAMS, payload: response.data});
};

export const fetchStream = (id) => async dispatch => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({type: types.FETCH_STREAM, payload: response.data});
}

export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.patch(`/streams/${id}`, formValues);

  dispatch({type: types.EDIT_STREAM, payload: response.data});
  history.push('/');
};

export const deleteStream = (id) => async dispatch => {
  await streams.delete(`/streams/${id}`);
  
  dispatch({type: types.DELETE_STREAM, payload: id});
  history.push('/');
}