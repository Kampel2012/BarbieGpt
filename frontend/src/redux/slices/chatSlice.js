import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChat: {},
  allChats: [],
  //status: 'loading', // loading | success | error
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    setallChats: (state, action) => {
      state.allChats = action.payload;
    },
    addChat: (state, action) => {
      state.allChats = [...state.allChats, action.payload];
    },
    removeChatById: (state, action) => {
      state.allChats = [
        ...state.allChats.filter((item) => item._id !== action.payload),
      ];
    },
  },
});

export const { setCurrentChat, setallChats, addChat, removeChatById } =
  chatSlice.actions;

export default chatSlice.reducer;
