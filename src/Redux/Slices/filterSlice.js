import { createSlice } from "@reduxjs/toolkit";
import qs from 'qs';


let initialState;
if (window.location.search) {
  const params = qs.parse(window.location.search.substring(1));
  initialState = {
    activeCategory: params.activeCategory,
    sortBy: params.sortBy
  };
} else {
  initialState = {
    activeCategory: "All",
    sortBy: "popularity"
  };
};


const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
    setSortBy(state, action) {
      state.sortBy = action.payload
    },
    setFilters(state, action) {
      state.activeCategory = action.payload.activeCategory;
      state.sortBy = action.payload.sortBy;
    }
  }
});


export const { setActiveCategory, setSortBy, setFilters } = filterSlice.actions;

export default filterSlice.reducer;