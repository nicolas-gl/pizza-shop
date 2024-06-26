import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './Slices/filterSlice'
import pizzasReducer from './Slices/pizzasSlice'


export const store = configureStore({
  reducer: {
    filter: filterReducer,
    pizzas: pizzasReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;