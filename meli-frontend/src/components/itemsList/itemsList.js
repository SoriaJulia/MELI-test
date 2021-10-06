import Container from 'react-bootstrap/Container'
import ItemCard from '../itemCard/itemCard'
import Breadcrumb from '../breadcrumb/breadcrumb'
import { useEffect } from 'react'
import useAsync, { states } from '../../hooks/useAsync'
import { useLocation } from 'react-router'

function searchItem(searchQuery) {
  return fetch(`http://localhost:3001/api/items?q=${searchQuery}`).then(
    (value) => {
      return value.json()
    }
  )
}

export default function ItemsList(props) {
  const { items, categories, setItemsList } = props
  const { error, status, data, run } = useAsync()
  const { search } = useLocation()
  useEffect(() => {
    if (status === 'resolved') {
      setItemsList(data.items, data.categories)
    }
  }, [setItemsList, data, status])

  useEffect(() => {
    const regex = /^\?(?:search=){1}((?:[\w-]*[\s]*)+)$/
    if (regex.test(search)) {
      const searchValue = regex.exec(search).slice(-1)
      run(searchItem(searchValue))
    }
  }, [search, run])

  let content
  if (status === states.RESOLVED && items && items.length) {
    content = (
      <>
        <Breadcrumb categories={categories} />
        {items.map((item) => {
          return <ItemCard item={item} key={item.id}></ItemCard>
        })}
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
