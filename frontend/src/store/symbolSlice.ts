// store/symbolSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface
interface SymbolState {
  symbol: string;
}

// Default state
const initialState: SymbolState = {
  symbol: 'bitcoin',
};

// Slice
const symbolSlice = createSlice({
  name: 'symbol',
  initialState,
  reducers: {
    setSymbol: (state, action: PayloadAction<string>) => {
      state.symbol = action.payload;
    },
  },
});

export const { setSymbol } = symbolSlice.actions;

export default symbolSlice.reducer;
