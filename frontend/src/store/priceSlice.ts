import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interface
interface PriceData {
  symbol: string;
  price: number;
  timestamp: string;
}

// Interface
interface PriceState {
  data: PriceData[];
  stock: string;
}

// Default state
const initialState: PriceState = {
  data: [],
  stock: '',
};

// Slice
const priceSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    updatePrice: (state, action: PayloadAction<PriceData[]>) => {
      state.data = action.payload;
    },
  },
});

export const { updatePrice } = priceSlice.actions;
export default priceSlice.reducer;
