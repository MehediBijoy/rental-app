import {useMemo} from 'react'
import {useSelector} from 'react-redux'

import Table from 'components/Table'

import {columns, searchFields} from './DashboardTable.config'

const DashboardTable = () => {
  const products = useSelector((state) => state.products)
  const data = useMemo(
    () =>
      products.map((item, index) => ({
        ...item,
        key: index + 1,
        durability: `${item.durability}/${item.max_durability}`,
      })),
    [products]
  )

  return (
    <Table
      columns={columns}
      data={data}
      searchFields={searchFields}
      withSearch
      title='Products'
      scroll={{x: 767}}
    />
  )
}

export default DashboardTable
