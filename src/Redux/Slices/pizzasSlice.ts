import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from '../store';


type Item = {
  id: number
  imgAlt: string
  imgUrl: string
  properties: string[]
  size_price: {}
  sku: number
  title: string
}

export enum Status {
  LOADING = 'loading',
  SUCESS = 'success',
  ERROR = 'error'
}

interface Data {
  id: string,
  items: Item[]
}

export const fetchPizzas = createAsyncThunk('pizzas/fetchByStatus', async () => {
  const { data } = await axios.get<Data>('https://63da6dca2af48a60a7cd9696.mockapi.io/main/pizzas');
  return data.items;
})

interface PizzaState {
  items: Item[],
  status: Status
}

const initialState: PizzaState = {
  items: [],
  status: Status.LOADING
};

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = Status.SUCESS;
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
  reducers: {}
});

export const selectPizza = (id: number) => (state: RootState) => state.pizzas.items.find(el => el.id === Number(id));

export default pizzasSlice.reducer;