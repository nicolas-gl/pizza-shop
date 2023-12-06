import { createSlice } from "@reduxjs/toolkit";
import qs from 'qs';


const URLparams = window.location.search.substring(1);

const initialStateFromURL = {
  activeCategory: qs.parse(URLparams).activeCategory,
  sortBy: qs.parse(URLparams).sortBy
};

export const initialState = {
  activeCategory: "All",
  sortBy: "popularity"
};


const filterSlice = createSlice({
  name: "filter",
  initialState: URLparams ? initialStateFromURL : initialState,

  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
      console.log('cat changed')
    },
    setSortBy(state, action) {
      state.sortBy = action.payload
    },
    reset: () => initialState
  }
});


export const { setActiveCategory, setSortBy, reset } = filterSlice.actions;

export default filterSlice.reducer;