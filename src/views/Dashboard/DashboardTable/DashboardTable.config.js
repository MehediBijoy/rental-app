import {CheckCircleFilled, CloseCircleFilled} from '@ant-design/icons'

const ToggleIcons = ({value}) => {
  const style = {
    fontSize: 20,
    color: 'green',
  }
  if (value) return <CheckCircleFilled style={style} />
  return <CloseCircleFilled style={{...style, color: 'red'}} />
}

export const columns = [
  {
    title: 'I',
    dataIndex: 'key',
    sorter: (a, b) => a.key - b.key,
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Code',
    dataIndex: 'code',
    align: 'center',
  },
  {
    title: 'Availability',
    dataIndex: 'availability',
    align: 'center',
    render: (value) => {
      return <ToggleIcons value={value} />
    },
  },
  {
    title: 'Need To Repair',
    dataIndex: 'needing_repair',
    align: 'center',
    render: (value) => {
      return <ToggleIcons value={value} />
    },
  },
  {
    title: 'Durability',
    dataIndex: 'durability',
  },
  {
    title: 'Mileage',
    dataIndex: 'mileage',
    sorter: (a, b) => a.mileage - b.mileage,
    align: 'center',
    render: (item) => {
      return item ?? '-'
    },
  },
  {
    title: 'Price',
    dataIndex: 'price',
    sorter: (a, b) => a.price - b.price,
    render: (price) => {
      return `$${price}`
    },
  },
  {
    title: 'Minimun rent period',
    dataIndex: 'minimum_rent_period',
    sorter: (a, b) => a.minimum_rent_period - b.minimum_rent_period,
    render: (days) => {
      return `${days} days`
    },
  },
]

export const searchFields = ['name', 'code', 'price']
