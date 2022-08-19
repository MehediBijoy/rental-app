import {createSlice} from '@reduxjs/toolkit'

const productSearch = createSlice({
  name: 'productSearch',
  initialState: {
    search: '',
  },
  reducers: {
    productSearchMethod: (state, {payload}) => {
      state.search = payload
    },
  },
})

export default productSearch
export const {productSearchMethod} = productSearch.actions
