const IngredientsRow = ({ className = '', name, amount, unit, actions }) => {
  return (
    <div
      className={`${
        !!actions ? 'ingredientsrow-main-actions' : 'ingredientsrow-main'
      } ${className}`}
    >
      <div className="ingredientsrow-item ingredientsrow-item-border">
        {name}
      </div>
      <div className="ingredientsrow-item-border">{amount}</div>
      <div className="ingredientsrow-item ingredientsrow-item-border">
        {unit}
      </div>
      {actions && <div className="ingredientsrow-item-border">{actions}</div>}
    </div>
  )
}

export default IngredientsRow
