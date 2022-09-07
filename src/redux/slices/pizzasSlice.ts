import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'

type FetchPizzasType = {
	sortBy: string
	order: string
	category: string
	search: string
	currentPage: number
	itemsLimit: number
}

export const fetchPizzas = createAsyncThunk(
	'pizza/fetchPizzasStatus',
	async ({sortBy, order, category, search, currentPage, itemsLimit}: FetchPizzasType) => {
		const {data} = await axios.get(
			`https://6318c23ef6b281877c75d9b1.mockapi.io/items?page=${currentPage}&limit=${itemsLimit}${category}&sortBy=${sortBy}&order=${order}${search}`
		)
		return data
	}
)

export type PizzaType = {
	id: number
	title: string
	price: number
	imageUrl: string
	size: number
	type: string
	sizes: Array<number>
	types: Array<number>
}

export type PizzasState = {
	items: Array<PizzaType>
	itemsCount: number
	status: 'loading' | 'success' | 'error'
}

const initialState: PizzasState = {
	items: [],
	itemsCount: 0,
	status: 'loading',
}

export const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setItems: (state, action: PayloadAction<Array<PizzaType>>) => {
			state.items = action.payload
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzas.pending, (state) => {
				state.status = 'loading'
				state.items = []
			})
			.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<{items: Array<PizzaType>, count: number}>) => {
				state.items = action.payload.items
				state.itemsCount = action.payload.count
				state.status = 'success'
			})
			.addCase(fetchPizzas.rejected, (state) => {
				state.status = 'error'
				state.items = []
			})
	}
})

export const selectPizzas = (state: RootState) => state.pizzas

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer