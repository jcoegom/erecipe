import './Pagination.css'
import { ReactComponent as ChevronLeft } from '../../../assets/chevron-left.svg'
import { ReactComponent as ChevronRight } from '../../../assets/chevron-right.svg'

const Pagination = ({ children, onClick }) => {
  return (
    <>
      <div className="chevron">
        <ChevronLeft onClick={e => onClick('dec')} />
      </div>
      {children}
      <div className="chevron">
        <ChevronRight onClick={e => onClick('inc')} />
      </div>
    </>
  )
}

export default Pagination
