import { Router } from '@reach/router'
import StoreProvider from './components/common/providers/store/StoreProvider'
import SearchReceipe from './pages/searchreceipe/SearchReceipe'
import ReceipeDetails from './pages/detailsreceipe/ReceipeDetails'

import './App.css'

const CreateReceipe = () => {
  return <div>New Receipe</div>
}

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
          <CreateReceipe path="/new-receipe" />
        </Router>
      </StoreProvider>
    </div>
  )
}

export default App
