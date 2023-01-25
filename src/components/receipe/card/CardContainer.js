import './Card.css'

const CardContainer = ({ children, show }) => {
  return (
    <>{show ? <div className="card-container-main">{children}</div> : null}</>
  )
}

export default CardContainer
