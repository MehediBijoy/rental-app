import {createSlice} from '@reduxjs/toolkit'

const BookProducts = createSlice({
  name: 'bookProducts',
  initialState: [],
  reducers: {
    bookProduct: (state, {payload}) => {
      state.push(payload)
    },
    removeBooked: (state, {payload}) => {
      state.splice(
        state.findIndex((item) => item.code === payload.code),
        1
      )
    },
  },
})

export default BookProducts
export const {bookProduct, removeBooked} = BookProducts.actions
