import { useEffect, useContext, useState } from 'react'
import { StoreContext } from '../../components/common/providers/store/StoreProvider'
import { navigate } from '@reach/router'
import axios from 'axios'
import configApi from '../../config/api.json'
import { handleError } from '../../utils/errors'
import './ReceipeDetails.css'

import Ingredients from '../../components/receipe/details/Ingredients'

const defaultQueryState = {
  load: false,
  error: null,
}

const ReceipeDetails = ({ id, operation }) => {
  const [
    store,
    {
      setReceipes,
      addReceipe,
      setTextToSearch,
      updateRecipe,
      setSelectedReceipe,
    },
  ] = useContext(StoreContext)

  const [isCacheAvailable, setIsCacheAvailable] = useState(true)

  const [queryState, setQueryState] = useState(defaultQueryState)

  const searchDataById = async query => {
    try {
      setQueryState({ load: true, error: null })
      setReceipes(null)
      const response = await axios.get(`${configApi.url}/${query}`)

      setQueryState({ load: false, error: null })
      updateRecipe(response.data, false)
      setSelectedReceipe(response.data)
    } catch (err) {
      let e = handleError(err)
      setQueryState({ load: false, error: e })
      setReceipes(null)
    }
  }

  useEffect(() => {
    if (!id) {
      navigate('/')
      return
    }
    if ((operation && operation === 'refresh') || store.receipes.length === 0) {
      //get the data from server and update cache
      if (store.receipes.length === 0) {
        setIsCacheAvailable(false)
      }
      searchDataById(`recipes/${id}`)
    } else {
      let receipeById = store.receipes.find(rec => String(rec.id) === id)
      setSelectedReceipe(receipeById)
    }
    //clean-up function
    return () => {
      setSelectedReceipe(null)
    }
  }, [])

  return (
    <>
      <div className="receipe-details-main">
        <div className="receipe-details-content">
          <div className="recipe-details-name">
            {store.selectedReceipe?.name}
          </div>
          <div className="recipe-details-title">Ingredients:</div>
          <Ingredients ingredients={store.selectedReceipe?.ingredients} />
          <div className="recipe-details-title">Intructions:</div>
          <div className="recipe-details-instructions">
            {store.selectedReceipe?.instructions}
          </div>
        </div>
      </div>
      <button onClick={_e => navigate('/search-receipe')}>Back</button>
    </>
  )
}

export default ReceipeDetails
