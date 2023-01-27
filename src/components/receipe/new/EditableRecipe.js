import './EditableRecipe.css'

import IngredientsRowEditable from './IngredientsRowEditable'
import IngredientsRow from '../details/IngredientsRow'
import Ingredients from '../details/Ingredients'

const EditableRecipe = ({
  ingredients,
  name,
  instructions,
  onClick,
  onChange,
  ingredientsEditable,
}) => {
  return (
    <div className="editable-receipe-main">
      <input
        className="editablerecipe-name-recipe"
        placeholder="name of the recipe"
        type="text"
        value={name}
        onChange={e => onChange({ name: 'name', value: e.target.value })}
      />
      {ingredientsEditable}
      <IngredientsRow
        className="ingredientsrow-header"
        name={'Name'}
        amount={'Amount'}
        unit={'Unit'}
        actions={'Actions'}
      />

      {ingredients &&
        ingredients.map(ing => (
          <IngredientsRow
            name={ing.name}
            amount={ing.amount}
            unit={ing.unit}
            actions={
              <button onClick={_e => onClick({ action: 'del', value: ing.id })}>
                X
              </button>
            }
          />
        ))}

      <textarea
        value={instructions}
        placeholder="Instructions"
        name="textarea"
        rows="5"
        cols="50"
        style={{ width: '100%', marginTop: '22px', marginBottom: '15px' }}
        onChange={e =>
          onChange({ name: 'instructions', value: e.target.value })
        }
      ></textarea>
    </div>
  )
}

export default EditableRecipe
