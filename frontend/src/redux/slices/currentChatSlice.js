import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChat: [],
  //status: 'loading', // loading | success | error
};

export const currentChatSlice = createSlice({
  name: 'currentChat',
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
  },
});

export const { setCurrentChat } = currentChatSlice.actions;

export default currentChatSlice.reducer;
