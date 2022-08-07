import {render as rtlRender, screen} from '@testing-library/react'

import {Provider} from 'react-redux'
import {PersistGate} from 'redux-persist/integration/react'

import createStore from 'redux/createStore'

export async function render(ui, {initalState} = {}) {
  const {store, persistor} = createStore(initalState)

  const Wrapper = ({children}) => (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  )

  const result = rtlRender(ui, {wrapper: Wrapper})
  try {
    const loadingFallback = await screen.findByText(/loaded/i)
    await waitForElementToBeRemoved(loadingFallback)
  } catch (error) {}

  return result
}
