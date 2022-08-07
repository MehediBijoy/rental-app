import Modal from 'components/Modal'

const Alert = ({isOpened, onClose, title, children, onConfirmed, ...rest}) => {
  return (
    <Modal
      {...rest}
      title={title}
      isOpened={isOpened}
      onClose={() => onClose(false)}
      onOk={onConfirmed}
      okText='Confirmed'
    >
      {children}
    </Modal>
  )
}

export default Alert
