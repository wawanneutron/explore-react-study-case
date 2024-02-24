import styles from './Message.module.css'
import PropTypes from 'prop-types'

Message.propTypes = {
  message: PropTypes.string
}

function Message({ message }) {
  return (
    <p className={styles.message}>
      <span role="img">👋 Hii, </span> {message}
    </p>
  )
}

export default Message
