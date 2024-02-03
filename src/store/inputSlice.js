// import { createSlice, configureStore } from '@reduxjs/toolkit'



// const inputSlice = createSlice({
//     name: 'inputs',
//     initialState: [],
//     reducers: {
//       addInput: (state, action) => {
//         state.push(action.payload);
//       },
//       removeInput: (state, action) => {
//         return state.filter(input => input.id !== action.payload);
//       },
//     },
//   });
  
//   const store = configureStore({
//     reducer: inputSlice.reducer,
//   });
  
//   // Step 2: Define the initial state and reducers
 

import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    title: '',
    objective: '',
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload;
    },
    setObjective: (state, action) => {
      state.objective = action.payload;
    },
  },
});

export const { setTitle, setObjective } = uiSlice.actions;
export const selectUI = (state) => state.ui; // Selector for accessing the state

export default uiSlice.reducer;