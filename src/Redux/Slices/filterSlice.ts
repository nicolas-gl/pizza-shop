import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import qs from 'qs';
import { RootState } from "../store";


const URLparams = window.location.search.substring(1);

interface FilterState {
  activeCategory: string
  sortBy: string,
  searchValue: string
}

const initialStateFromURL: FilterState = {
  activeCategory: String(qs.parse(URLparams).activeCategory),
  sortBy: String(qs.parse(URLparams).sortBy),
  searchValue: ""
};

export const mainState = {
  activeCategory: "All",
  sortBy: "popularity",
  searchValue: ""
};

export const categories = ["All", "Vegetarian", "Meat", "Spicy", "Seafood"];
export const sortParams = ["popularity", "alphabetically", "price (low-high)", "price (high-low)"];


const filterSlice = createSlice({
  name: "filter",
  initialState: URLparams ? initialStateFromURL : mainState,
  reducers: {
    setActiveCategory(state, action: PayloadAction<string>) {
      state.activeCategory = action.payload;
    },
    setSortBy(state, action: PayloadAction<string>) {
      state.sortBy = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    resetState: () => mainState
  }
});

export const selectFilter = (state: RootState) => state.filter

export const { setActiveCategory, setSortBy, setSearchValue, resetState } = filterSlice.actions;

export default filterSlice.reducer;