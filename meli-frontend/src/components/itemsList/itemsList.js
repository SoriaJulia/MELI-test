import './itemsList.scss';
import Container from 'react-bootstrap/Container'
import ItemCard from '../itemCard/itemCard';
import Breadcrumb from '../breadcrumb/breadcrumb';
function searchItem(searchQuery) {
    return fetch(`http://localhost:3000/api/items?q=${searchQuery}`).then((value)=>{return value.json()})
  }


export default function ItemsList(props){
	console.log('list props',props)
	const {items, categories} = props;
	return (
        
			<Container>
            <Breadcrumb categories={categories} >
            </Breadcrumb>
					{
							items && items.map((item) => {
									return <ItemCard item={item} key={item.id}></ItemCard>

							})
					}
			</Container>
            
	)
}