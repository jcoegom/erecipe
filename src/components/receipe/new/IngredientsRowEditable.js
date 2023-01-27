const IngredientsRowEditable = ({
  name,
  amount,
  unit,
  onChange,
  errorMsg,
  onClick,
}) => {
  return (
    <div className={`ingredientsroweditable-main`}>
      <div className="ingredientsroweditable-ingredients-title">
        Ingredients:
      </div>
      <div>Name</div>
      <div>Amount</div>
      <div>Units</div>

      <div>
        <input
          placeholder="name"
          type="text"
          value={name}
          onChange={e => onChange({ name: 'name', value: e.target.value })}
        />
      </div>
      <div>
        <input
          placeholder="amount"
          type="text"
          value={amount}
          onChange={e => onChange({ name: 'amount', value: e.target.value })}
        />
      </div>
      <div>
        <input
          placeholder="units"
          type="text"
          value={unit}
          onChange={e => onChange({ name: 'unit', value: e.target.value })}
        />
      </div>
      {errorMsg && (
        <div className="ingredientsroweditable-main-error">{errorMsg}</div>
      )}
      <div className="ingredientsroweditable-add-button-wrapper">
        <button
          className="ingredientsroweditable-add-button"
          onClick={_e => onClick('add')}
        >
          Add
        </button>
      </div>
    </div>
  )
}

export default IngredientsRowEditable
