import { useContext, useState } from 'react'
import { StoreContext } from '../../components/common/providers/store/StoreProvider'
import HeaderSearch from '../../components/receipe/search/HeaderSearch'
import Card from '../../components/receipe/card/Card'
import CardContainer from '../../components/receipe/card/CardContainer'
import { useEffect } from 'react'
import { handleError } from '../../utils/errors'
import configApi from '../../config/api.json'
import Loading from '../../components/common/loading/Loading'
import Errors from '../../components/common/Errors/Errors'
import { useRef } from 'react'

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
      const response = await fetch(`${configApi.url}/${query}`)
      const data = await response.json()

      setQueryState({ load: false, error: null })
      setReceipes(data)
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

  useEffect(() => {}, [])

  console.log('store', store)

  return (
    <div>
      <HeaderSearch
        content={
          <input ref={inputSearchRef} type="text" placeholder="Search..." />
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
        <Card srcImg={''} name={'Name of receipe'} numIngredients={'4'} />
        <Card srcImg={''} name={'Name of receipe'} numIngredients={'4'} />
      </CardContainer>
    </div>
  )
}

export default SearchReceipe
