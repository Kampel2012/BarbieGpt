import { configureStore } from '@reduxjs/toolkit';
import chatSliceReducer from './slices/chatSlice';

export const store = configureStore({
  reducer: {
    chat: chatSliceReducer,
  },
});
