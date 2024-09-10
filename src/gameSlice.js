import { createSlice} from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    currentMove: 0,
    history: [Array(9).fill(null)],
    xIsNext: true,
  },
  reducers: {
    setCurrentMove: (state, action) => {
      state.currentMove = action.payload.move
    },
    setHistory: (state,action) => {
      state.history = action.payload.nextHistory
    },
    setXIsNext: (state) => {
      state.xIsNext = state.currentMove % 2 === 0
    }
  }
});

export const { setCurrentMove, setHistory, setXIsNext } = gameSlice.actions;

export default gameSlice.reducer;