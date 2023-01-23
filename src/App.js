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
  const [textToSearch, setTextToSearch] = useState('')
  const [page, setPage] = useState(1)

  const search = async query => {
    try {
      setQueryState({ load: true, error: null, result: null })
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=a461e386&${query}`,
      )
      const data = await response.json()
      setQueryState({ load: false, error: null, result: data })
    } catch (err) {
      setPage(1)
      let e = handleError(err)
      setQueryState({ load: false, error: e, result: null })
    }
  }

  const handleChange = data => {
    setTextToSearch(data)
  }
  const handleClickPagination = data => {
    if (data === 'inc') {
      search(`s=${textToSearch}&page=${page + 1}`)
      setPage(prevPage => prevPage + 1)
    }
    if (data === 'dec' && page > 1) {
      search(`s=${textToSearch}&page=${page - 1}`)
      setPage(prevPage => prevPage - 1)
    }
  }

  const handleClickSearch = () => {
    setPage(1)
    search(`s=${textToSearch}&page=1`)
  }

  useEffect(() => {
    search('s=king')
  }, [])

  return (
    <div className="App">
      <Header
        value={textToSearch}
        onChange={data => handleChange(data)}
        actions={<button onClick={e => handleClickSearch()}>Search</button>}
      />

      <Loading show={queryState.load}>
        <p>No results yet</p>
      </Loading>

      <Errors show={!!queryState.error || !!queryState?.result?.Error}>
        {!!!!queryState?.result?.Error ? (
          <p>{queryState?.result?.Error}</p>
        ) : (
          <p>An error has occurred</p>
        )}
      </Errors>

      <Body show={!!queryState?.result?.Search}>
        <Pagination onClick={data => handleClickPagination(data)}>
          <CardContainer>
            {queryState?.result &&
              queryState?.result?.Search?.map(result => (
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
