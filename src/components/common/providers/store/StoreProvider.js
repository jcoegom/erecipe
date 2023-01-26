import React, { useReducer, createContext } from 'react'

export const StoreContext = createContext()

const SET_RECEIPES = 'setReceipes'
const ADD_RECIPE = 'addReceipe'
const SET_SELECTED_RECEIPE = 'setSelectedReceipe'
const SET_TEXT_TO_SEARCH = 'setTextToSearch'

const defaultStore = {
  receipes: [],
  textToSearch: '',
  selectedReceipe: null,
}

//reducer
const reducerStore = (state, { type = '', payload = '' }) => {
  switch (type) {
    case SET_RECEIPES:
      return { ...state, receipes: payload }
    case ADD_RECIPE:
      return { ...state, receipes: [payload, ...state.receipes] }
    case SET_SELECTED_RECEIPE:
      return { ...state, selectedReceipe: payload }
    case SET_TEXT_TO_SEARCH:
      return { ...state, textToSearch: payload }
  }
}

const StoreProvider = props => {
  const [store, dispatchStore] = useReducer(reducerStore, defaultStore)

  //action creators
  const setReceipes = receipes => {
    dispatchStore({ type: SET_RECEIPES, payload: receipes })
  }

  const addReceipe = receipe => {
    dispatchStore({ type: ADD_RECIPE, payload: receipe })
  }

  const setSelectedReceipe = receipe => {
    dispatchStore({ type: SET_SELECTED_RECEIPE, payload: receipe })
  }

  const setTextToSearch = text => {
    dispatchStore({ type: SET_TEXT_TO_SEARCH, payload: text })
  }

  const updateRecipe = (receipeToUpdate, insertIfnotFound = false) => {
    let receipes = [...store.receipes]

    const foundReceipeToUpdate = false
    receipes = receipes.map(receipe => {
      if (receipe.id === receipeToUpdate.id) {
        foundReceipeToUpdate = true
        return receipeToUpdate
      } else return receipe
    })
    if (!foundReceipeToUpdate && insertIfnotFound) {
      receipes = [...receipes, receipeToUpdate]
    }
    dispatchStore({ type: SET_RECEIPES, payload: receipes })
  }

  return (
    <StoreContext.Provider
      value={[
        store,
        {
          setReceipes,
          addReceipe,
          setTextToSearch,
          updateRecipe,
          setSelectedReceipe,
        },
      ]}
    >
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
