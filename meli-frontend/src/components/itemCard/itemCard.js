import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/esm/Col';
import Image from 'react-bootstrap/Image'
import { formatPrice } from "../../utils";
import { useHistory } from "react-router-dom";

export default function ItemCard (props) {
    const {item} = props
    const history = useHistory()

    function onClickHandler(e){
        history.push(`/items/${item.id}`)
    }
    return (
        <Row key={item.id} onClick={onClickHandler}>
            <Col xs={{span:2, offset:1}} >
                <Image 
                src={item.picture} 
                alt={item.title}
                width="180px" 
                height="180px" 
                className='item image'/>
            </Col>
            <Col xs={6}>
                <div className='item price'>
                    {formatPrice(item.price.currency, item.price.amount)}
                    <> {item.free_shipping && 
                        <img 
                        alt="Envio gratis"
                        src="/ic_shipping.png"
                        srcSet="/ic_shipping@2x.png.png"
                        height="24px"/>}</>
                </div>
                <div className='item title'>
                    {item.title}
                </div>
            </Col>
            <Col xs={2}>
                <div className='item state'>
                    {item.state}
                </div>
            </Col>
            <hr/>
        </Row>
    )

}