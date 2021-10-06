import { createContext, useContext, useReducer } from 'react'

function itemsReducer(state, action) {
  switch (action.type) {
    case 'setItemsList': {
      return {
        ...state,
        items: action.payload.items,
        categories: action.payload.categories,
        id: null,
        item: null,
      }
    }
    case 'setItemDetail': {
      return {
        ...state,
        id: action.payload.id,
        item: action.payload.item,
        items: [],
      }
    }
    case 'clear': {
      return {
        ...state,
        items: null,
        categories: null,
        id: null,
        item: null,
      }
    }
    default: {
      return state
    }
  }
}
const ItemsContext = createContext()
export default function ItemsProvider(props) {
  const [state, dispatch] = useReducer(itemsReducer, {
    id: null,
    items: [],
    categories: [],
    item: null,
  })
  return <ItemsContext.Provider value={{ state, dispatch }} {...props} />
}

export function useItems() {
  const context = useContext(ItemsContext)
  if (!context) {
    throw new Error('useItems must be used within an ItemsProvider')
  }
  return context
}
