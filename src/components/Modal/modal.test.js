import React from 'react'
import {render} from 'tests'

import Modal from './Modal'

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

jest.mock('react', () => ({
  ...jest.requireActual('react'),
}))

it('modal component should render correctly', async () => {
  const tree = await render(<Modal isOpened={true} onClose={() => {}} />)
  expect(tree).toMatchSnapshot()
})
