import React, { useReducer, createContext } from 'react'

export const StoreContext = createContext()

const SET_RECEIPES = 'setReceipes'
const ADD_RECIPE = 'addReceipe'
const SET_TEXT_TO_SEARCH = 'setTextToSearch'

const defaultStore = {
  receipes: [],
  textToSearch: '',
}

//reducer
const reducerStore = (state, { type = '', payload = '' }) => {
  switch (type) {
    case SET_RECEIPES:
      return { ...state, receipes: payload }
    case ADD_RECIPE:
      return { ...state, receipes: [payload, ...state.receipes] }
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

  const setTextToSearch = text => {
    dispatchStore({ type: SET_TEXT_TO_SEARCH, payload: text })
  }

  return (
    <StoreContext.Provider
      value={[store, { setReceipes, addReceipe, setTextToSearch }]}
    >
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
