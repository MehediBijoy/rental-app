import {List as AntList} from 'antd'
import {capitalize} from 'utils'

const List = ({product}) => {
  return (
    <AntList
      style={{
        marginBottom: '5px',
      }}
      size='small'
      bordered
      dataSource={Object.entries(product)}
      renderItem={(item) => (
        <AntList.Item>
          <strong>{item[0]}</strong>:{' '}
          {item[1] ? capitalize(item[1].toString()) : '-'}
        </AntList.Item>
      )}
    />
  )
}

export default List
