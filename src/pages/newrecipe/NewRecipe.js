import './NewRecipe.css'
import EditableRecipe from '../../components/receipe/new/EditableRecipe'
import { navigate } from '@reach/router'
import { useState } from 'react'
import IngredientsRowEditable from '../../components/receipe/new/IngredientsRowEditable'
import { validateNewIngredient } from './validations'
import { createId } from '../../utils/common'
import ReceipeDetails from '../detailsreceipe/ReceipeDetails'

const defaultRecipe = {
  name: '',
  ingredients: [],
  instructions: '',
}

const defaultIngredient = {
  name: '',
  amount: 0,
  unit: '',
  errorMsg: '',
}

const NewRecipe = () => {
  const [recipe, setRecipe] = useState(defaultRecipe)
  const [ingredient, setIngredient] = useState(defaultIngredient)

  const handleChangeData = ({ name, value }) => {
    setRecipe(prevRecipe => ({ ...prevRecipe, [name]: value }))
  }
  const handleChangeIngredient = ({ name, value }) => {
    setIngredient(prevIng => ({ ...prevIng, [name]: value }))
  }
  const handleClikNewIng = data => {
    setIngredient(prevIng => ({ ...prevIng, errorMsg: '' }))
    let errorMsg = validateNewIngredient(ingredient)
    if (errorMsg) {
      setIngredient(prevIng => ({ ...prevIng, errorMsg }))
      return
    } else {
      setIngredient(defaultIngredient)
    }

    setRecipe(prevRecipe => ({
      ...prevRecipe,
      ingredients: [
        ...prevRecipe.ingredients,
        { ...ingredient, id: createId() },
      ],
    }))
  }

  const handleOnClickEditable = ({ action, value }) => {
    if (action === 'del') {
      let ingredientsBeforeRemove = [...recipe.ingredients]
      let ingredientsAfterRemove = ingredientsBeforeRemove.filter(
        ing => ing.id !== value,
      )
      setRecipe(prevRecipe => ({
        ...prevRecipe,
        ingredients: ingredientsAfterRemove,
      }))
    }
  }

  return (
    <div className="newrecipe-main">
      <EditableRecipe
        ingredients={recipe.ingredients}
        name={recipe.name}
        instructions={recipe.instructions}
        onClick={handleOnClickEditable}
        onChange={handleChangeData}
        ingredientsEditable={
          <IngredientsRowEditable
            name={ingredient.name}
            amount={ingredient.amount}
            unit={ingredient.unit}
            errorMsg={ingredient.errorMsg}
            onChange={handleChangeIngredient}
            onClick={handleClikNewIng}
          />
        }
      />
      <button>SAVE</button>
      <button onClick={e => navigate('/search-receipe/refresh')}>BACK</button>
    </div>
  )
}

export default NewRecipe
