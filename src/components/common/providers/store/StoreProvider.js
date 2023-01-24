import React, { useReducer, createContext } from 'react'

export const StoreContext = createContext()

const SET_RECEIPES = 'setReceipes'
const ADD_RECIPE = 'addReceipe'

const defaultStore = {
  receipes: [],
}

//reducer
const reducerStore = (state, { type = '', payload = '' }) => {
  switch (type) {
    case SET_RECEIPES:
      return { ...state, receipes: payload }
    case ADD_RECIPE:
      return { ...state, receipes: [payload, ...state.receipes] }
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

  return (
    <StoreContext.Provider
      value={[store, dispatchStore, { setReceipes, addReceipe }]}
    >
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreProvider
