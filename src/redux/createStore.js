import storage from 'redux-persist/lib/storage'
import {persistStore, persistReducer} from 'redux-persist'
import {combineReducers, configureStore} from '@reduxjs/toolkit'

import products from './slices/products'
import BookProducts from './slices/bookProducts'
import productSearch from './slices/productSearch'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  products: products.reducer,
  bookProducts: BookProducts.reducer,
  productSearch: productSearch.reducer,
})

export default function createStore() {
  const presistedReducer = persistReducer(persistConfig, rootReducer)
  const middleware = []
  const storeConfig = {
    reducer: presistedReducer,
    middleware,
  }
  const store = configureStore(storeConfig)
  const persistor = persistStore(store)
  return {store, persistor}
}
