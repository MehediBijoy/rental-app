import {useCallback, useMemo, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Input, Select, Row, Col, Form} from 'antd'

import Modal from 'components/Modal'
import Alert from 'components/Alert'
import List from 'components/List'
import {removeBooked} from 'redux/slices/bookProducts'

const ReturnModal = ({isOpened, onClose}) => {
  const dispatch = useDispatch()
  const [popConfirm, setPopConfirm] = useState(false)
  const products = useSelector((state) => state.products)
  const bookedProducts = useSelector((state) => state.bookProducts)

  const [form] = Form.useForm()
  const selected = Form.useWatch('booked_id', form)

  const data = useMemo(
    () =>
      bookedProducts.map((item) => ({
        ...products.find((ii) => ii.code === item.product),
        id: item.id,
      })),
    [products, bookedProducts]
  )

  const selectedProduct = useMemo(
    () => bookedProducts.find((item) => item.id === selected),
    [selected, bookedProducts]
  )

  const onOkHandler = useCallback(() => {
    setPopConfirm(true)
  }, [])

  const onConfirmed = useCallback(() => {
    dispatch(removeBooked({id: selected}))
    form.resetFields()
    setPopConfirm(false)
    onClose(false)
  }, [dispatch, form, setPopConfirm, onClose, selected])

  return (
    <>
      <Modal
        title='Return a Product'
        okText='Yes'
        cancelText='No'
        isOpened={isOpened}
        onClose={() => onClose(false)}
        onOk={() =>
          form
            .validateFields()
            .then((value) => onOkHandler(value))
            .catch(console.log)
        }
      >
        <Form labelCol={{span: 4}} wrapperCol={{span: 20}} form={form}>
          <Form.Item
            name='booked_id'
            label='Product'
            rules={[
              {
                required: true,
                message: 'Please select a product',
              },
            ]}
          >
            <Select
              style={{width: '100%'}}
              showSearch
              placeholder='Select a Product'
              optionFilterProp='children'
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
            >
              {data.map((item, index) => (
                <Select.Option value={item.id} key={index}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {selected && <List product={selectedProduct} />}
          <Form.Item label='Status'>
            <Input value='Used Mileage' disabled />
          </Form.Item>
        </Form>
      </Modal>
      <Alert
        title='Return a Product'
        isOpened={popConfirm}
        onClose={setPopConfirm}
        onConfirmed={onConfirmed}
      >
        <Row justify='center'>
          <Col span={24} style={{textAlign: 'center'}}>
            Your total price is: ${selectedProduct?.price}
          </Col>
          <Col span={24} style={{textAlign: 'center'}}>
            Do you want to procedure?
          </Col>
        </Row>
      </Alert>
    </>
  )
}

export default ReturnModal
