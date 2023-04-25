import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    inputValue: (state = '', action) => {
      switch (action.type) {
        case 'UPDATE_INPUT_VALUE':
          return action.payload;
        default:
          return state;
      }
    },
    inputTitle: (state = '', action) => {
      switch (action.type) {
        case 'UPDATE_TITLE_VALUE':
          return action.payload;
        default:
          return state;
      }
    },
    inputObjective: (state = '', action) => {
      switch (action.type) {
        case 'UPDATE_OBJECTIVE_VALUE':
          return action.payload;
        default:
          return state;
      }
    },
    inputMaterial: (state = '', action) => {
      switch (action.type) {
        case 'UPDATE_MATERIAL_VALUE':
          return action.payload;
        default:
          return state;
      }
    },
  },
})