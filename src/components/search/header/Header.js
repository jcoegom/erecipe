import './Header.css'

const Header = ({ onChange, value, actions }) => {
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

export default Header
