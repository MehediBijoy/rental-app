import {useMemo} from 'react'
import {useSelector} from 'react-redux'

import {capitalize} from 'utils'
import Table from 'components/Table'

import {columns} from './DashboardTable.config'

const DashboardTable = () => {
  const products = useSelector((state) => state.products)
  const data = useMemo(
    () =>
      products.map((item, index) => ({
        ...item,
        key: index + 1,
        availability: capitalize(item.availability.toString()),
        needing_repair: capitalize(item.needing_repair.toString()),
        durability: `${item.durability}/${item.max_durability}`,
      })),
    [products]
  )

  return (
    <Table
      columns={columns}
      data={data}
      withSearch
      title='Products'
      // footer={CustomTableFooter}
      // pagination={false}
    />
  )
}

export default DashboardTable
