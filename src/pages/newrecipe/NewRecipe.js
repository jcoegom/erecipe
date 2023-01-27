import './NewRecipe.css'
import EditableRecipe from '../../components/receipe/new/EditableRecipe'
import { navigate } from '@reach/router'
import { useState } from 'react'
import IngredientsRowEditable from '../../components/receipe/new/IngredientsRowEditable'
import { validateNewIngredient } from './validations'
import { createId } from '../../utils/common'
import axios from 'axios'
import configApi from '../../config/api.json'
import { handleError } from '../../utils/errors'
import Feedback from '../../components/common/Feedback/Feedback'

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

const defaultFeedback = {
  state: '',
  message: '',
}

const NewRecipe = () => {
  const [recipe, setRecipe] = useState(defaultRecipe)
  const [ingredient, setIngredient] = useState(defaultIngredient)
  const [feedback, setFeedback] = useState(defaultFeedback)

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

  const handleClickSave = async () => {
    try {
      setFeedback({ state: 'load', message: 'Operation in progress...' })
      let cleanedIngredients = recipe.ingredients.map(ing => {
        let { id, errorMsg, ...restIng } = ing
        return restIng
      })
      await axios.post(`${configApi.url}/recipes`, {
        ...recipe,
        ingredients: cleanedIngredients,
      })
      setRecipe(defaultRecipe)
      setFeedback({
        state: 'success',
        message: 'Operation finished successfully!',
      })
    } catch (err) {
      handleError(err)
      setFeedback({
        state: 'error',
        message: 'An error has ocurred! Please try again!',
      })
    }
  }

  return (
    <div className="newreceipe-wrapper">
      <div className="newrecipe-main">
        <Feedback type={feedback.state} message={feedback.message} />
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
        <button className="newreceipe-save" onClick={_e => handleClickSave()}>
          SAVE
        </button>
        <button
          className="newreceipe-back"
          onClick={e => navigate('/search-receipe/refresh')}
        >
          BACK
        </button>
      </div>
    </div>
  )
}

export default NewRecipe
