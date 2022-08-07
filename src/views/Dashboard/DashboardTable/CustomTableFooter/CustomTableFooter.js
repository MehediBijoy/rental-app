import {Row, Col} from 'antd'

import RentProduct from '../../RentService/RentProduct'
import ReturnProduct from '../../RentService/ReturnProduct'

const CustomTableFooter = () => {
  return (
    <Row justify='end'>
      <Col>
        <RentProduct />
        <ReturnProduct />
      </Col>
    </Row>
  )
}

export default CustomTableFooter
