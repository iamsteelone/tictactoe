import {createSlice} from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    history: Array(9).fill(null),
    currentMove: 0,
    currentSquares: [Array(9).fill(null)],
    nextSquares: 'O'
  },
  reducers: {
    setHistory: (state, action) => {
      state.history = [...history.slice(0, currentMove + 1), nextSquares]
    },
    currentMove: state => {
      state.value += 1;
    },
    setNextSquares: (state, action) => {
      state.nextSquares = state.nextSquares === 'X' ? 'O' : 'X';
      state.currentSquares = state.history[state.currentMove];
    },
    setCurrentMove: (state) => {

    }
  }
});

export const { setHistory, setCurrentMove,  setNextSquares } = gameSlice.actions;

export default gameSlice.reducer;