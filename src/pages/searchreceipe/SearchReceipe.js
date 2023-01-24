import HeaderSearch from '../../components/receipe/search/HeaderSearch'
import Card from '../../components/receipe/card/Card'
import CardContainer from '../../components/receipe/card/CardContainer'

const SearchReceipe = ({ operation }) => {
  return (
    <div>
      <HeaderSearch actions={<button>Search</button>} />
      <CardContainer>
        <Card srcImg={''} name={'Name of receipe'} numIngredients={'4'} />
        <Card srcImg={''} name={'Name of receipe'} numIngredients={'4'} />
      </CardContainer>
    </div>
  )
}

export default SearchReceipe
