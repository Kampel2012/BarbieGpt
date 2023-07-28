import { configureStore } from '@reduxjs/toolkit';
import chatSliceReducer from './slices/chatSlice';
import userSliceReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    chat: chatSliceReducer,
    user: userSliceReducer,
  },
});
