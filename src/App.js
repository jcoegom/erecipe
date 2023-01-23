import React, { useState, useEffect } from 'react'
import './App.css'

import placeholderImg from './placeholder.png'
import Header from './components/search/header/Header'
import { handleError } from './utils/errors'
import Errors from './components/common/Errors/Errors'
import Loading from './components/common/loading/Loading'
import Pagination from './components/common/pagination/Pagination'

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
      <Errors show={queryState.error}>
        <p>An error has occurred</p>
      </Errors>

      <div className="search-results">
        <Pagination>
          <div className="search-results-list">
            {queryState?.result &&
              queryState.result.Search.map(result => (
                <div key={result.imdbID} className="search-item">
                  <img
                    src={
                      result.Poster === 'N/A' ? placeholderImg : result.Poster
                    }
                    alt="poster"
                  />
                  <div className="search-item-data">
                    <div className="title">{result.Title}</div>
                    <div className="meta">{`${result.Type} | ${result.Year}`}</div>
                  </div>
                </div>
              ))}
          </div>
        </Pagination>
      </div>
    </div>
  )
}

export default App
