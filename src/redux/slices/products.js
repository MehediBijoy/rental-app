import {createSlice} from '@reduxjs/toolkit'
import data from 'data/Data.json'
import moment from 'moment'
import {getDaysDiff} from 'utils'

const products = createSlice({
  name: 'products',
  initialState: data,
  reducers: {
    updateProduct: (state, {payload}) => {
      const days = getDaysDiff(moment(payload.from), moment(payload.to))
      const product = state.find((item) => item.code === payload.product)
      const durability = product.type === 'plain' ? days * 1 : days * 4
      const needing_repair = product.durability - durability <= 0
      Object.assign(product, {
        ...product,
        mileage: product.mileage + days * 10,
        durability: product.durability - durability,
        needing_repair: needing_repair,
        availability: !needing_repair,
      })
    },
  },
})

export const {updateProduct} = products.actions
export default products
