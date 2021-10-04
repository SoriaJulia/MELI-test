import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/esm/Col';
import Image from 'react-bootstrap/Image'
import currencies from '../../constants/currencies'
import {ARS} from '../../constants/currencies'
import { useHistory } from "react-router-dom";

export default function ItemCard (props) {
    const {item} = props
    const history = useHistory()
    function formatPrice(currencyId = ARS, price){
        if(!price) return;
        return `${currencies[currencyId]}  ${price.toLocaleString('es')}`  
    }
    function onClickHandler(e){
        history.push(`/items/${item.id}`)
    }
    return (
        <Row key={item.id} onClick={onClickHandler}>
            <Col xs={{span:2, offset:1}} >
                <Image 
                src={item.thumbnail} 
                alt={item.title}
                width="180px" 
                height="180px" 
                className='item image'/>
            </Col>
            <Col xs={6}>
                <div className='item price'>
                    {formatPrice(item.currency_id, item.price)}
                </div>
                <div className='item title'>
                    {item.title}
                </div>
            </Col>
            <Col xs={2}>
                <div className='item state'>
                    {item.address.state_name}
                </div>
            </Col>
            <hr/>
        </Row>
    )

}