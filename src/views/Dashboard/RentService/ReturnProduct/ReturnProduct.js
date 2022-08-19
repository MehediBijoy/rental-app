import {Button} from 'antd'
import {useState} from 'react'

import ReturnModal from 'components/ReturnModal'

const ReturnProduct = () => {
  const [onOpened, setOpened] = useState(false)
  return (
    <>
      <Button
        type='primary'
        size='large'
        danger
        style={{marginLeft: '5px'}}
        onClick={() => setOpened(true)}
      >
        Return
      </Button>
      <ReturnModal isOpened={onOpened} onClose={setOpened} />
    </>
  )
}

export default ReturnProduct
