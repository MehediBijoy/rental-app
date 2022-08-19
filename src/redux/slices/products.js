import moment from 'moment'
import {createSlice} from '@reduxjs/toolkit'

import {getDaysDiff} from 'utils'
import data from 'data/Data.json'

const products = createSlice({
  name: 'products',
  initialState: data,
  reducers: {
    updateProduct: (state, {payload}) => {
      const days = getDaysDiff(moment(payload.from), moment(payload.to))
      const product = state.find(item => item.code === payload.code)
      const durability = product.type === 'plain' ? days * 1 : days * 4
      const needing_repair = product.durability - durability <= 0
      Object.assign(product, {
        ...product,
        mileage: product.mileage + days * 10,
        durability: product.durability - durability,
        needing_repair: needing_repair,
        availability: false,
      })
    },

    updateReturnProduct: (state, {payload}) => {
      const product = state.find(item => item.code === payload.code)
      const durability = product.type === 'meter' ? (parseInt(payload?.mileage) / 10) * 2 : 0
      const needing_repair = product.durability - durability <= 0
      Object.assign(product, {
        ...product,
        mileage: product.mileage + parseInt(payload?.mileage),
        durability: product.durability - durability,
        needing_repair: needing_repair,
        availability: !needing_repair,
      })
    },
  },
})

export default products
export const {updateProduct, updateReturnProduct} = products.actions
