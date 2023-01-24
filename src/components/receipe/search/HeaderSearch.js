import './HeaderSearch.css'

const HeaderSearch = ({ onChange, value, actions }) => {
  return (
    <div className="header-search">
      <input
        onChange={e => onChange(e.target.value)}
        value={value}
        type="text"
        placeholder="Search..."
      />
      {actions}
    </div>
  )
}

export default HeaderSearch
