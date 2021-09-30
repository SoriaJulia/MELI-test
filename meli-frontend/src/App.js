import './App.scss';
import ItemsList from './components/itemsList/itemsList';
import Search from './components/search/search';
import ItemsProvider, { useItems } from './contexts/itemsContext';
import {useCallback} from "react"
function useDispatchItemsActions(dispatch){
  return {
    setItemsList: useCallback((items)=> {
      dispatch({type:"setItemsList", payload:{items}})
    },[dispatch])
  }
}
function ItemsRoutes(props){
  const{state, dispatch} = useItems();
  const {setItemsList} = useDispatchItemsActions(dispatch)
  return(
    <>
        <Search setItemsList={setItemsList}/>
        <ItemsList items={state.items}/>
    </>
  )
}

function App() {

  
  
  return (
    
    <div>
      <ItemsProvider>
        <ItemsRoutes/>
      </ItemsProvider>
      {/* <p>{status === 'resolved'?items:'cargando'}</p> */}
    </div>
  );
}

export default App;

