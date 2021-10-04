import { useEffect } from "react";
import { useParams } from "react-router"
import useAsync from "../../hooks/useAsync";
function searchItem(id) {
    return fetch(`http://localhost:3000/api/items/${id}`).then((value)=>{return value.json()})
  }

export default function ItemDetail(props){
    const {id} = useParams()
    const {error, status, data, run} = useAsync();
    const {setItemDetail, item} = props;
    
    useEffect(()=>{
        if(status === 'idle'){
            run(searchItem(id));
        }
    },[id, run, status])

    useEffect(()=>{   
        if(status === 'resolved'){
            setItemDetail(id, data)
        }
    },[id, setItemDetail, data, status])

    return(
        <>{

        item && <div>item detail {item.price}</div>
        }
        </>
    )
}