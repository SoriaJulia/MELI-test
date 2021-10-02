import './itemsList.scss';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/esm/Col';
import Image from 'react-bootstrap/Image'

export default function ItemsList(props){
    const {items} = props;

    return (
        <Container>
            {
                items.map(item => {
                    return (
                        <Row key={item.id}>
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
                                    {item.price}
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
                })
            }
        </Container>
    )
}