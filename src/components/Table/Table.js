import {useMemo, useState} from 'react'
import {Table as AntTable} from 'antd'

import TableHeader from './TableHeader'

const Table = ({title, columns, data, withSearch, ...rest}) => {
  const [search, setSearch] = useState()
  const dataSource = useMemo(() => {
    if (!search) return data
    return data.filter((item) => {
      return Object.entries(item)
        .map((item) => item[1])
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase())
    })
  }, [search, data])

  return (
    <AntTable
      columns={columns}
      dataSource={dataSource ?? []}
      bordered
      title={() => (
        <TableHeader
          title={title}
          withSearch={withSearch}
          searchChange={setSearch}
        />
      )}
      {...rest}
    />
  )
}

export default Table
