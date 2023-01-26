const IngredientsRow = ({ className, name, amount, unit }) => {
  return (
    <div className={`ingredientsrow-main ${className}`}>
      <div>{name}</div>
      <div>{amount}</div>
      <div>{unit}</div>
    </div>
  )
}

export default IngredientsRow
