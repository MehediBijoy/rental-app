import {render} from 'tests'

import Table from './Table'

it('table render should as before', async () => {
  const tree = await render(<Table />)
  expect(tree).toMatchSnapshot()
})
