import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  activeCategory: "All",
  sortBy: "popularity"
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload
    },
    setSortBy(state, action) {
      state.sortBy = action.payload
    }
  }
})

export const { setActiveCategory, setSortBy } = filterSlice.actions

export default filterSlice.reducer