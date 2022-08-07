import {render} from 'tests'
import Alert from './Alert'

it('component should render as before', async () => {
  const tree = await render(<Alert />)
  expect(tree).toMatchSnapshot()
})
