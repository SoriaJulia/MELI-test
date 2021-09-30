import{useEffect, useState} from "react"
import useAsync from "../../hooks/useAsync";
function searchItem(searchQuery) {
    return fetch(`http://localhost:3000/api/items?q=${searchQuery}`).then((value)=>{return value.json()})
  }
export default function Search(props){
    const [inputVal, setInputVal] = useState("");
    const {error, status, data, run} = useAsync();
    const {setItemsList} = props;

    useEffect(()=>{
        if(status === "resolved") {
            setItemsList(data);
        }
    },[setItemsList, data, status]);

    const handleSubmit = (e) => {
        e.preventDefault();
        run(searchItem(inputVal));
      }
    return (
        <>
        <form onSubmit={handleSubmit} >
        <input value={inputVal} onChange={(e)=>setInputVal(e.target.value)} type="text"/>
        <button type="submit">buscar</button>
      </form>
        </>
    )
}
