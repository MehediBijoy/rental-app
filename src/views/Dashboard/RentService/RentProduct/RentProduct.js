import {Button} from 'antd'
import {useState} from 'react'

import RentModal from 'components/RentModal'

const RentProduct = () => {
  const [onOpened, setOpened] = useState(false)
  return (
    <>
      <Button type='primary' size='large' onClick={() => setOpened(true)}>
        Book
      </Button>
      <RentModal isOpened={onOpened} onClose={setOpened} />
    </>
  )
}

export default RentProduct
