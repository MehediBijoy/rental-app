import {createSlice} from '@reduxjs/toolkit'

const productSearch = createSlice({
  name: 'productSearch',
  initialState: '',
  reducers: {
    productSearchMethod: (state, {payload}) => (state = payload),
  },
})

export default productSearch
export const {productSearchMethod} = productSearch.actions
