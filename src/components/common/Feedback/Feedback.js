import Loading from '../loading/Loading'
import Errors from '../Errors/Errors'
import './Feedback.css'

const Feedback = ({ type, message, className = '' }) => {
  console.log('type-message', type, message)
  switch (type) {
    case 'load':
      return <Loading show={true}>{message}</Loading>
    case 'error':
      return <Errors show={true}>{message}</Errors>
    case 'success':
      return <div className={'feedback-success ' + className}>{message}</div>

    default:
      return null
  }
}

export default Feedback
