import axios from 'axios';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";


export const fetchPizzas = createAsyncThunk('pizzas/fetchByStatus', async (params, thunkAPI) => {
  const { data } = await axios.get('https://63da6dca2af48a60a7cd9696.mockapi.io/main/pizzas');
  return (data.items);
})

const initialState = {
  items: [],
  status: 'loading'
};

const pizzasSlice = createSlice({
  name: "pizzas",
  initialState: initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      })
  },
});


export default pizzasSlice.reducer;