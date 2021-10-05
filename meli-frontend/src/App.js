import './App.scss';
import ItemsList from './components/itemsList/itemsList';
import Search from './components/search/search';
import ItemDetail from './components/itemDetail/itemDetail';
import ItemsProvider, { useItems } from './contexts/itemsContext';
import {useCallback} from "react"
import {BrowserRouter as Router, Switch,Route} from "react-router-dom";
function useDispatchItemsActions(dispatch){
  return {
    setItemsList: useCallback((items, categories)=> {
      dispatch({type:"setItemsList", payload:{items,categories}})
    },[dispatch]),
    setItemDetail: useCallback((id, item)=>{
      dispatch({type:"setItemDetail",payload:{id, item}})
    },[dispatch]
    )
  }
}
function ItemsRoutes(props){
  const{state, dispatch} = useItems();
  const {setItemsList, setItemDetail} = useDispatchItemsActions(dispatch)
  return(
    <>
    <Route path="/">
      <Search setItemsList={setItemsList}/>
    </Route>
    <Switch>
      <Route path="/items/:id">
        <ItemDetail setItemDetail={setItemDetail} item={state.item} categories={state.categories}></ItemDetail>
      </Route>
      <Route path="/items">
        <ItemsList items={state.items} setItemsList={setItemsList} categories={state.categories}/>
      </Route>
    </Switch>  
    </>
  )
}

function App() {

  
  
  return (
    
    <Router>
      <ItemsProvider>
        <ItemsRoutes/>
      </ItemsProvider>
      {/* <p>{status === 'resolved'?items:'cargando'}</p> */}
      
    </Router>
  );
}

export default App;

