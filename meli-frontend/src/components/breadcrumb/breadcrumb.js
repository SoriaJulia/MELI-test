import Col from 'react-bootstrap/esm/Col'
import './breadcrumb.scss'
export default function Breadcrumb(props) {
  const { categories } = props
  const mutableCategories = [...categories]
  const active = mutableCategories.pop()
  return (
    <Col className="categories" xs={{ span: 10, offset: 1 }}>
      {mutableCategories.map((category) => {
        return <span key={category}>{`${category} > `}</span>
      })}
      <span className="categories active">{active}</span>
    </Col>
  )
}
