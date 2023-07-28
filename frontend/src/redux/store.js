import { configureStore } from '@reduxjs/toolkit';
import currentChatReducer from './slices/currentChatSlice';

export const store = configureStore({
  reducer: {
    currentChat: currentChatReducer,
  },
});
