export const columns = [
  {
    title: 'I',
    dataIndex: 'key',
    sorter: (a, b) => a.key - b.key,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.code - b.code,
  },
  {
    title: 'Code',
    dataIndex: 'code',
    sorter: (a, b) => a.code - b.code,
  },
  {
    title: 'Availability',
    dataIndex: 'availability',
    sorter: (a, b) => a.availability - b.availability,
  },
  {
    title: 'Need To Repair',
    dataIndex: 'needing_repair',
    sorter: (a, b) => a.needing_repair - b.needing_repair,
  },
  {
    title: 'Durability',
    dataIndex: 'durability',
    sorter: (a, b) => a.durability - b.durability,
  },
  {
    title: 'Mileage',
    dataIndex: 'mileage',
    sorter: (a, b) => a.mileage - b.mileage,
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
    }
  },
  {
    title: 'Minimun rent period',
    dataIndex: 'minimum_rent_period',
    sorter: (a, b) => a.minimum_rent_period - b.minimum_rent_period,
    render: (days) => {
      return `${days} days`
    }
  },
]
