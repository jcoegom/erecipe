import { Router } from '@reach/router'
import StoreProvider from './components/common/providers/store/StoreProvider'
import SearchReceipe from './pages/searchreceipe/SearchReceipe'

import './App.css'

const ReceipeDetails = () => {
  return <div>Receipe Details</div>
}
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
          <ReceipeDetails path="/receipe-details/:name" />
          <CreateReceipe path="/new-receipe" />
        </Router>
      </StoreProvider>
    </div>
  )
}

export default App
