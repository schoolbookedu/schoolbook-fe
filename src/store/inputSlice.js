import { createSlice, configureStore } from '@reduxjs/toolkit'



const inputSlice = createSlice({
    name: 'inputs',
    initialState: [],
    reducers: {
      addInput: (state, action) => {
        state.push(action.payload);
      },
      removeInput: (state, action) => {
        return state.filter(input => input.id !== action.payload);
      },
    },
  });
  
  const store = configureStore({
    reducer: inputSlice.reducer,
  });
  
  // Step 2: Define the initial state and reducers
 