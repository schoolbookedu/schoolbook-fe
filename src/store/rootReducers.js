import { createReducer } from 'redux-actions';
import { combineReducers } from 'redux';

const initialState = {
  inputValue: ''
};

const inputReducer = createReducer(initialState, {
  UPDATE_INPUT_VALUE: (state, { payload }) => ({
    ...state,
    inputValue: payload
  })
});

export default combineReducers({
  input: inputReducer
});