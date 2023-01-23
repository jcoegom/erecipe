import './Pagination.css'
import { ReactComponent as ChevronLeft } from '../../../assets/chevron-left.svg'
import { ReactComponent as ChevronRight } from '../../../assets/chevron-right.svg'

const Pagination = ({ children, onClick }) => {
  return (
    <>
      <div onClick={e => onClick('dec')} className="chevron">
        <ChevronLeft />
      </div>
      {children}
      <div onClick={e => onClick('inc')} className="chevron">
        <ChevronRight />
      </div>
    </>
  )
}

export default Pagination
