import './Errors.css'
const Errors = ({ show, children }) => {
  return <>{show ? <div className="errors-main">{children}</div> : null}</>
}

export default Errors
