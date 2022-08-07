import React from 'react'
import {render} from 'tests'

import List from './List'

it('List component should render correctly', async () => {
  const tree = await render(<List product={{}} />)
  expect(tree).toMatchSnapshot()
})
