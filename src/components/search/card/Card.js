import './Card.css'
import placeholderImg from '../../../assets/placeholder.png'

const Card = ({ imdbID, Poster, Title, Type, Year }) => {
  return (
    <div key={imdbID} className="search-item">
      <img src={Poster === 'N/A' ? placeholderImg : Poster} alt="poster" />
      <div className="search-item-data">
        <div className="title">{Title}</div>
        <div className="meta">{`${Type} | ${Year}`}</div>
      </div>
    </div>
  )
}

export default Card
