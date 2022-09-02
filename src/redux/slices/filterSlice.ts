import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type SortType = {
  name: string
  sortProperty: string
}

export type FilterState = {
  categoryId: number
  sort: SortType
  currentPage: number
}

const initialState: FilterState = {
  categoryId: 0,
  sort: {
    name: 'популярности',
		sortProperty: 'rating',
  },
  currentPage: 1,
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload
    },
    setSort: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setFilters: (state, action: PayloadAction<FilterState>) => {
      state.categoryId = action.payload.categoryId
      state.sort = action.payload.sort
      state.currentPage = action.payload.currentPage
    }
  },
})

export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions

export default filterSlice.reducer