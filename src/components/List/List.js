import {List as AntList} from 'antd'

import {capitalize} from 'utils'

const List = ({product}) => {
  return (
    <AntList
      size='small'
      bordered
      dataSource={Object.entries(product)}
      renderItem={item => (
        <AntList.Item>
          <strong>{capitalize(item[0].split('_').join(' '))}</strong>:{' '}
          {item[1] !== null ? capitalize(item[1].toString()) : '-'}
        </AntList.Item>
      )}
    />
  )
}

export default List
