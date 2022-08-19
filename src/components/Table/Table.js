import {useMemo} from 'react'
import {Table as AntTable} from 'antd'
import {useSelector} from 'react-redux'

import TableHeader from './TableHeader'

const Table = ({title, columns, data, withSearch, searchFields, ...rest}) => {
  const search = useSelector((state) => state.productSearch)
  const dataSource = useMemo(() => {
    if (!search) return data
    return data.filter((item) => {
      return Object.entries(item)
        .map((item) => searchFields.includes(item[0]) && item[1])
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase())
    })
  }, [search, data, searchFields])

  return (
    <AntTable
      columns={columns}
      dataSource={dataSource ?? []}
      bordered
      title={() => (
        <TableHeader
          title={title}
          withSearch={withSearch}
          searchValue={search}
        />
      )}
      {...rest}
    />
  )
}

export default Table
