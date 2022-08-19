import {useCallback, useMemo, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Input, Select, Row, Col, Form} from 'antd'

import Modal from 'components/Modal'
import Alert from 'components/Alert'
import List from 'components/List'
import {removeBooked} from 'redux/slices/bookProducts'
import {updateReturnProduct} from 'redux/slices/products'

const ReturnModal = ({isOpened, onClose}) => {
  const dispatch = useDispatch()
  const [popConfirm, setPopConfirm] = useState(false)
  const products = useSelector((state) => state.products)
  const bookedProducts = useSelector((state) => state.bookProducts)

  const [form] = Form.useForm()
  const selected = Form.useWatch('code', form)

  const data = useMemo(
    () =>
      bookedProducts.map((item) => ({
        ...products.find((ii) => ii.code === item.code),
      })),
    [products, bookedProducts]
  )

  const selectedProduct = useMemo(() => {
    const product = bookedProducts.find((item) => item.code === selected)
    const productObject = data.find((item) => item.code === product?.code)
    return {
      name: productObject?.name,
      ...product,
    }
  }, [selected, bookedProducts, data])

  const onOkHandler = useCallback(() => {
    setPopConfirm(true)
  }, [])

  const onConfirmed = useCallback(() => {
    dispatch(removeBooked({code: selected}))
    dispatch(updateReturnProduct(form.getFieldsValue()))
    form.resetFields()
    setPopConfirm(false)
    onClose(false)
  }, [dispatch, form, setPopConfirm, onClose, selected])

  const onCloseHandler = useCallback(() => {
    onClose(false)
    form.resetFields()
  }, [form, onClose])

  return (
    <>
      <Modal
        title='Return a Product'
        okText='Yes'
        cancelText='No'
        isOpened={isOpened}
        onClose={onCloseHandler}
        onOk={() =>
          form
            .validateFields()
            .then((value) => onOkHandler(value))
            .catch(console.log)
        }>
        <Form labelCol={{span: 4}} wrapperCol={{span: 20}} form={form}>
          <Form.Item
            name='code'
            label='Product'
            rules={[
              {
                required: true,
                message: 'Please select a product',
              },
            ]}>
            <Select
              style={{width: '100%'}}
              showSearch
              placeholder='Select a Product'
              optionFilterProp='children'
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }>
              {data.map((item, index) => (
                <Select.Option value={item.code} key={index}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {selected && selectedProduct && (
            <Form.Item label='Details'>
              <List product={selectedProduct} />
            </Form.Item>
          )}
          <Form.Item
            label='Mileage'
            name='mileage'
            rules={[
              {
                required: true,
                message: 'Please enter used mileage',
              },
              {
                validator(_, value) {
                  if (value < 0) {
                    return Promise.reject('Enter positive number')
                  }
                  return Promise.resolve()
                },
              },
            ]}>
            <Input placeholder='Used Mileage' type='number' />
          </Form.Item>
        </Form>
      </Modal>
      <Alert
        title='Return a Product'
        isOpened={popConfirm}
        onClose={setPopConfirm}
        onConfirmed={onConfirmed}>
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
