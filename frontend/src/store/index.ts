// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import symbolReducer from './symbolSlice';
import priceReducer from './priceSlice';

const store = configureStore({
  reducer: {
    symbol: symbolReducer,
    prices: priceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
