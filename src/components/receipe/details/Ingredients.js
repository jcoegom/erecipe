import './Ingredients.css'

import IngredientsRow from './IngredientsRow'

const Ingredients = ({ ingredients }) => {
  return (
    <div className="ingredients-main">
      <IngredientsRow
        name={'Name'}
        amount={'amount'}
        unit={'Units'}
        className={'ingredientsrow-header'}
      />
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
