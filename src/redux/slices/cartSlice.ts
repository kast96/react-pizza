import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

type ItemType = {
  id: number
	title: string
	price: number
	imageUrl: string
	size: number
	type: string
}

export type ItemsCartType = ItemType & {
  count: number
}

export type CartState = {
  totalPrice: number,
  items: Array<ItemsCartType>
}

const initialState: CartState = {
  totalPrice: 0,
  items: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<ItemType>) => {
      const findItem = state.items.find(item => item.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }
      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum
      }, 0)
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.id !== action.payload)

      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum
      }, 0)
    },
    clearItem: (state) => {
      state.items = []
      state.totalPrice = 0
    },
    plusItem: (state, action: PayloadAction<number>) => {
      const findItem = state.items.find(item => item.id === action.payload)
      if (findItem) findItem.count++

      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum
      }, 0)
    },
    minusItem: (state, action: PayloadAction<number>) => {
      const findItem = state.items.find(item => item.id === action.payload)
      if (findItem && findItem.count > 1) findItem.count--

      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum
      }, 0)
    }
  },
})

export const selectCart = (state: RootState) => state.cart
export const selectCartItemById = (id: number) => (state: RootState) => state.cart.items.find(item => item.id === id)

export const { addItem, removeItem, clearItem, plusItem, minusItem } = cartSlice.actions

export default cartSlice.reducer