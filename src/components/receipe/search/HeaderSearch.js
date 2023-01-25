import './HeaderSearch.css'

const HeaderSearch = ({ onChange, value, content, actions }) => {
  return (
    <div className="header-search">
      {content}
      {actions}
    </div>
  )
}

export default HeaderSearch
