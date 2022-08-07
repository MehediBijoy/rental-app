import {PageHeader, Input} from 'antd'

const TableHeader = ({title, withSearch, searchChange}) => {
  return (
    <PageHeader
      title={title}
      extra={[
        withSearch && (
          <Input
            key='1'
            title='Search'
            placeholder='search'
            onChange={({target}) => searchChange(target.value)}
          />
        ),
      ]}
      style={{margin: 0, padding: 0}}
    />
  )
}

export default TableHeader
