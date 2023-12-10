import { createSlice } from "@reduxjs/toolkit";
import qs from 'qs';


const URLparams = window.location.search.substring(1);

const initialStateFromURL = {
  activeCategory: qs.parse(URLparams).activeCategory,
  sortBy: qs.parse(URLparams).sortBy,
  searchValue: ""
};

export const mainState = {
  activeCategory: "All",
  sortBy: "popularity",
  searchValue: ""
};


const filterSlice = createSlice({
  name: "filter",
  initialState: URLparams ? initialStateFromURL : mainState,

  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setSearchValue(state, action) {
      state.searchValue = action.payload;
    },
    resetState: () => mainState
  }
});


export const { setActiveCategory, setSortBy, setSearchValue, resetState } = filterSlice.actions;

export default filterSlice.reducer;