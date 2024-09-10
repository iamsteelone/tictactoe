import { createSlice} from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    currentMove: 0,
  },
  reducers: {
    'setCurrentMove': (state, action) => {
      state.currentMove = action.payload.move
    }
  }
});

export const { setCurrentMove } = gameSlice.actions;

export default gameSlice.reducer;