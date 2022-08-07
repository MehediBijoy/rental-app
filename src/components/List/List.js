import {List as AntList} from 'antd'
import {capitalize} from 'utils'

const List = ({product}) => {
  console.log(product)
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
          <strong>{item[0]}</strong>: {capitalize(item[1].toString())}
        </AntList.Item>
      )}
    />
  )
}

export default List
