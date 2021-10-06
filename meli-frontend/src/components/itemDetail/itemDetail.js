import './itemDetail.scss'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import useAsync, { states } from '../../hooks/useAsync'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/esm/Image'
import Button from 'react-bootstrap/Button'
import Breadcrumb from '../breadcrumb/breadcrumb'
import conditions from '../../constants/conditions'
import { formatPrice } from '../../utils'

function searchItem(id) {
  return fetch(`http://localhost:3001/api/items/${id}`).then((value) => {
    return value.json()
  })
}

export default function ItemDetail(props) {
  const { id } = useParams()
  const { error, status, data, run } = useAsync()
  const { setItemDetail, item, categories } = props

  useEffect(() => {
    if (status === states.ILDE) {
      run(searchItem(id))
    }
  }, [id, run, status])

  useEffect(() => {
    if (status === states.RESOLVED) {
      setItemDetail(id, data.item)
    }
  }, [id, setItemDetail, data, status])

  let content

  if (status === states.RESOLVED && item) {
    content = (
      <>
        <Breadcrumb categories={categories} />
        <Row>
          <Col xs={{ span: 7, offset: 1 }}>
            <Image src={item.picture} alt={item.title} width="680px" />
            <div className="description title">Descripcion del producto</div>
            <div className="description content">{item.description}</div>
          </Col>
          <Col className="detail" xs="3">
            <div className="condition">{`${conditions[item.condition]} - ${
              item.sold_quantity
            } vendidos`}</div>
            <div className="title">{item.title}</div>
            <div className="price">
              {formatPrice(item.price.currency, item.price.amount)}
            </div>
            <div className="d-grid gap-2">
              <Button variant="primary" size="lg">
                Comprar
              </Button>
            </div>
          </Col>
        </Row>
      </>
    )
  } else if (status === states.RESOLVED) {
    content = 'No se encontraron resultados'
  } else if (status === states.PENDING) {
    content = 'Cargando...'
  } else if (status === states.REJECTED) {
    console.log(error)
    content = 'Error buscando resultados'
  }

  return <Container>{content}</Container>
}
