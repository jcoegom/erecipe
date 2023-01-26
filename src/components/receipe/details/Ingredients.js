import './Ingredients.css'

import IngredientsRow from './IngredientsRow'

const Ingredients = ({ ingredients }) => {
  return (
    <div className="ingredients-main">
      <div>Ingredients:</div>
      <IngredientsRow name={'Name'} amount={'amount'} unit={'Units'} />
      {ingredients &&
        ingredients.map(ing => {
          return (
            <IngredientsRow
              key={ing.name}
              name={ing.name}
              amount={ing.amount}
              unit={ing.unit}
            />
          )
        })}
    </div>
  )
}

export default Ingredients
