import './Body.css'

const Body = ({ show, children }) => {
  return <>{show ? <div className="search-results">{children}</div> : null}</>
}

export default Body
