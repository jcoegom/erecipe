import './Pagination.css'
import { ReactComponent as ChevronLeft } from '../../../assets/chevron-left.svg'
import { ReactComponent as ChevronRight } from '../../../assets/chevron-right.svg'

const Pagination = ({ children }) => {
  return (
    <>
      <div className="chevron">
        <ChevronLeft />
      </div>
      {children}
      <div className="chevron">
        <ChevronRight />
      </div>
    </>
  )
}

export default Pagination
