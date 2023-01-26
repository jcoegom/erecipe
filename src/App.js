import { Router } from '@reach/router'
import StoreProvider from './components/common/providers/store/StoreProvider'
import SearchReceipe from './pages/searchreceipe/SearchReceipe'
import ReceipeDetails from './pages/detailsreceipe/ReceipeDetails'
import NewRecipe from './pages/newrecipe/NewRecipe'

import './App.css'

function App() {
  return (
    <div className="App">
      <StoreProvider>
        <Router>
          <SearchReceipe path="/" />
          <SearchReceipe path="/search-receipe/" />
          <SearchReceipe path="/search-receipe/:operation" />
          <ReceipeDetails path="/receipe-details/:id" />
          <ReceipeDetails path="/receipe-details/:id/:operation" />
          <NewRecipe path="/new-receipe" />
        </Router>
      </StoreProvider>
    </div>
  )
}

export default App
