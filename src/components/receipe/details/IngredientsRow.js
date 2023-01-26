const IngredientsRow = ({ className = '', name, amount, unit, actions }) => {
  console.log('name-amount-unit', name, amount, unit)
  return (
    <div
      className={`${
        !!actions ? 'ingredientsrow-main-actions' : 'ingredientsrow-main'
      } ${className}`}
    >
      <div>{name}</div>
      <div>{amount}</div>
      <div>{unit}</div>
      {actions && <div>{actions}</div>}
    </div>
  )
}

export default IngredientsRow
