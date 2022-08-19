import {PageHeader, Input} from 'antd'
import {useDispatch} from 'react-redux'

import {productSearchMethod} from 'redux/slices/productSearch'

const TableHeader = ({title, withSearch, searchValue}) => {
  const dispatch = useDispatch()
  return (
    <PageHeader
      title={title}
      extra={[
        withSearch && (
          <Input
            key='1'
            title='Search'
            value={searchValue}
            placeholder='search'
            onChange={({target}) => dispatch(productSearchMethod(target.value))}
          />
        ),
      ]}
      style={{margin: 0, padding: 0}}
    />
  )
}

export default TableHeader
