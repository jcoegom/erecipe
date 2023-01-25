import './Card.css'
import noImage from '../../../assets/noImage.jpg'

const Card = ({ id, srcImg, name, numIngredients, onClick = () => {} }) => {
  return (
    <div onClick={_e => onClick(id)} className="search-item">
      <div className="card-search-image">
        <img src={srcImg ? srcImg : noImage} alt={name} />
      </div>
      <div className="search-item-data">
        <div className="title">{name}</div>
        <div className="meta">{`(${numIngredients} Ingredients)`}</div>
      </div>
    </div>
  )
}

export default Card
