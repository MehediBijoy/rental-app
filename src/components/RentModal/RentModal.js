import moment from 'moment'
import * as yup from 'yup'
import {useCallback, useMemo, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {DatePicker, Select, Row, Col, Form} from 'antd'

import Modal from 'components/Modal'
import Alert from 'components/Alert'
import List from 'components/List'

import {getDaysDiff} from 'utils'
import {updateProduct} from 'redux/slices/products'
import {bookProduct} from 'redux/slices/bookProducts'

const schema = yup.object().shape({
  product: yup.string().required(),
  from: yup
    .date()
    .typeError('Return Date is required')
    .required()
    .min(new Date(), 'can not select previous date'),

  to: yup
    .date()
    .typeError('Return Date is required')
    .required('return date is required')
    .min(new Date(), 'can not select previous date'),
})

const yupSync = {
  async validator({field}, value) {
    schema.validateSyncAt(field, {[field]: value})
  },
}

const RentModal = ({isOpened, onClose}) => {
  const dispatch = useDispatch()
  const [popConfirm, setPopConfirm] = useState(false)
  const [estimatePrice, setEstimatePrice] = useState()
  const products = useSelector((state) => state.products)
  const [form] = Form.useForm()
  const {getFieldValue} = form

  const data = useMemo(
    () => products.filter((item) => item.availability && !item.needing_repair),
    [products]
  )

  const selected = Form.useWatch('product', form)
  const selectedProduct = useMemo(
    () => data.find((item) => item.code === selected),
    [data, selected]
  )

  const onOkHandler = useCallback(
    async (values) => {
      const fromDate = moment(values?.from)
      const toDate = moment(values?.to)
      const totalDays = getDaysDiff(fromDate, toDate)
      const price = selectedProduct?.price * totalDays
      setEstimatePrice(price)
      setPopConfirm(true)
    },
    [selectedProduct]
  )

  const onConfirmed = useCallback(() => {
    dispatch(updateProduct(form.getFieldsValue()))
    dispatch(bookProduct({...form.getFieldsValue(), price: estimatePrice}))
    form.resetFields()
    setEstimatePrice()
    setPopConfirm(false)
    onClose(false)
  }, [dispatch, form, estimatePrice, setEstimatePrice, setPopConfirm, onClose])

  return (
    <>
      <Modal
        title='Book a Product'
        okText='Yes'
        cancelText='No'
        isOpened={isOpened}
        onClose={() => onClose(false)}
        onOk={async () =>
          form
            .validateFields()
            .then((value) => onOkHandler(value))
            .catch(console.log)
        }
      >
        <Form labelCol={{span: 4}} wrapperCol={{span: 20}} form={form}>
          <Form.Item name='product' label='Product' rules={[yupSync]}>
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
                <Select.Option value={item.code} key={index}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          {selected && selectedProduct && <List product={selectedProduct} />}
          <Form.Item
            label='From'
            name='from'
            rules={[
              yupSync,
              {
                validator() {
                  if (!selected) {
                    return Promise.reject('Select product first')
                  }
                  return Promise.resolve()
                },
              },
            ]}
          >
            <DatePicker
              style={{
                width: '100%',
              }}
              format='DD-MM-YYYY'
            />
          </Form.Item>
          <Form.Item
            name='to'
            label='To'
            rules={[
              yupSync,
              {
                validator(_, value) {
                  if (!selected) {
                    return Promise.reject('Select product first')
                  }
                  if (!getFieldValue('from')) {
                    return Promise.reject('Select Pick Date')
                  }
                  if (
                    getDaysDiff(getFieldValue('from'), value) <
                    selectedProduct?.minimum_rent_period
                  ) {
                    return Promise.reject(
                      'Rental period must be greater then minimum rental period'
                    )
                  }
                  return Promise.resolve()
                },
              },
            ]}
          >
            <DatePicker
              style={{
                width: '100%',
              }}
              format='DD-MM-YYYY'
            />
          </Form.Item>
        </Form>
      </Modal>
      <Alert
        title='Book a Product'
        isOpened={popConfirm}
        onClose={setPopConfirm}
        onConfirmed={onConfirmed}
      >
        <Row justify='center'>
          <Col span={24} style={{textAlign: 'center'}}>
            Your estimate price is: ${estimatePrice}
          </Col>
          <Col span={24} style={{textAlign: 'center'}}>
            Do you want to confirm?
          </Col>
        </Row>
      </Alert>
    </>
  )
}

export default RentModal
