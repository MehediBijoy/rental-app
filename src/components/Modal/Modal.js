import {Modal as AntModal} from 'antd'

const Modal = ({onClose, onOk, isOpened, title, children, ...rest}) => {
  return (
    <AntModal
      centered
      title={title}
      visible={isOpened}
      onCancel={onClose}
      onOk={onOk}
      {...rest}
    >
      {children}
    </AntModal>
  )
}

export default Modal
