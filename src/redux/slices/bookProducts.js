import {createSlice} from '@reduxjs/toolkit'

const BookProducts = createSlice({
  name: 'bookProducts',
  initialState: [],
  reducers: {
    bookProduct: (state, {payload}) => {
      state.push({
        id: state.length + 1,
        product: payload.product,
        price: payload.price,
      })
    },
    removeBooked: (state, {payload}) => {
      state.splice(
        state.findIndex((item) => item.id === payload.id),
        1
      )
    },
  },
})

export const {bookProduct, removeBooked} = BookProducts.actions
export default BookProducts
