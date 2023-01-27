import { useContext, useState, useRef } from 'react'
import { navigate } from '@reach/router'
import axios from 'axios'
import { StoreContext } from '../../components/common/providers/store/StoreProvider'
import HeaderSearch from '../../components/receipe/search/HeaderSearch'
import Card from '../../components/receipe/card/Card'
import CardContainer from '../../components/receipe/card/CardContainer'
import { useEffect } from 'react'
import { handleError } from '../../utils/errors'
import configApi from '../../config/api.json'
import Loading from '../../components/common/loading/Loading'
import Errors from '../../components/common/Errors/Errors'

import './SearchReceipe.css'

const defaultQueryState = {
  load: false,
  error: null,
}

const SearchReceipe = ({ operation }) => {
  const [store, { setReceipes, addReceipe, setTextToSearch }] =
    useContext(StoreContext)
  const [queryState, setQueryState] = useState(defaultQueryState)
  const inputSearchRef = useRef(null)

  const searchData = async query => {
    try {
      setQueryState({ load: true, error: null })
      setReceipes(null)
      const response = await axios.get(`${configApi.url}/${query}`)

      setQueryState({ load: false, error: null })
      setReceipes(response.data)
    } catch (err) {
      let e = handleError(err)
      setQueryState({ load: false, error: e })
      setReceipes(null)
    }
  }

  const handleClickSearch = () => {
    setTextToSearch(inputSearchRef.current.value)
    let query = 'recipes/'
    if (inputSearchRef.current.value) {
      query += `?ingredient=${inputSearchRef.current.value}`
    }
    searchData(query)
  }

  useEffect(() => {
    if (
      operation === 'refresh' ||
      !store.receipes ||
      store.receipes.length === 0
    ) {
      let query = 'recipes/'
      if (inputSearchRef.current.value) {
        query += `?ingredient=${store.textToSearch}`
      }
      searchData(query)
    }
  }, [])

  return (
    <>
      <div className="search-create-new">
        <button onClick={_e => navigate('/new-receipe')}>+Create New</button>
      </div>
      <div>
        <HeaderSearch
          content={
            <input
              style={{ fontSize: '1.2em' }}
              defaultValue={store.textToSearch}
              ref={inputSearchRef}
              type="text"
              placeholder="Search..."
            />
          }
          actions={<button onClick={_e => handleClickSearch()}>Search</button>}
        />
        <Loading show={queryState.load}>
          <p>No results yet</p>
        </Loading>

        <Errors show={!!queryState.error}>
          <p>{queryState?.error}</p>
        </Errors>
        <CardContainer show={!!store.receipes}>
          {store.receipes &&
            store.receipes.map(receipe => (
              <Card
                key={receipe.id}
                id={receipe.id}
                srcImg={receipe.url}
                name={receipe.name}
                numIngredients={receipe.ingredients.length}
                onClick={id => navigate(`/receipe-details/${id}`)}
              />
            ))}
        </CardContainer>
      </div>
    </>
  )
}

export default SearchReceipe
