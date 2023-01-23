import React, { useState, useEffect } from 'react'
import './App.css'

import Header from './components/search/header/Header'
import { handleError } from './utils/errors'
import Errors from './components/common/Errors/Errors'
import Loading from './components/common/loading/Loading'
import Pagination from './components/common/pagination/Pagination'
import Card from './components/search/card/Card'
import CardContainer from './components/search/card/CardContainer'
import Body from './components/search/body/Body'

const defaultQueryState = { load: false, error: null, result: null }

function App() {
  const [queryState, setQueryState] = useState(defaultQueryState)

  useEffect(() => {
    search()
  }, [])

  const search = async () => {
    try {
      setQueryState({ load: true, error: null, result: null })
      const response = await fetch(
        'http://www.omdbapi.com/?apikey=a461e386&s=king',
      )
      const data = await response.json()
      setQueryState({ load: false, error: null, result: data })
    } catch (err) {
      let e = handleError(err)
      setQueryState({ load: false, error: e, result: null })
    }
  }

  return (
    <div className="App">
      <Header actions={<button>Search</button>} />

      <Loading show={queryState.load}>
        <p>No results yet</p>
      </Loading>
      <Errors show={!!queryState.error}>
        <p>An error has occurred</p>
      </Errors>

      <Body show={!!queryState.result}>
        <Pagination>
          <CardContainer>
            {queryState?.result &&
              queryState.result.Search.map(result => (
                <Card
                  imdbID={result.imdbID}
                  key={result.imdbID}
                  Poster={result.Poster}
                  Title={result.Title}
                  Type={result.Type}
                  Year={result.Year}
                />
              ))}
          </CardContainer>
        </Pagination>
      </Body>
    </div>
  )
}

export default App
