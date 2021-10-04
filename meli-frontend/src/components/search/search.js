import'./search.scss'
import{useEffect, useState, memo} from "react"
import useAsync from "../../hooks/useAsync";
import Navbar from "react-bootstrap/Navbar";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Container from 'react-bootstrap/esm/Container';
import { useLocation } from 'react-router';


export default function Search(props){
  const [inputVal, setInputVal] = useState("");
  const {error, status, data, run} = useAsync();
  const {setItemsList} = props;
  const {search} = useLocation()
  useEffect(()=>{
      if(status === "resolved") {
          console.log('search',data)
          setItemsList(data.items, data.categories);
      }
  },[setItemsList, data, status]);

  useEffect(()=>{
    const regex = /^\?search+=([\w-]*)?$/;
    if(regex.test(search)){
      const searchValue = regex.exec(search).slice(-1) 
      setInputVal(searchValue)
      // run(searchItem(searchValue));
    }
  },[search,run])

  const handleSubmit = (e) => {
      e.preventDefault();
      // run(searchItem(inputVal));
    }

  return (
      <Navbar>
        <Container>
          <div className="col-1 offset-1 d-inline">
            <img 
              src="/Logo_ML.png"
              srcSet="/Logo_ML@2x.png.png"
              alt="Logo Mercado Libre"
              height='40px'
            />
          </div>
          <Form onSubmit={handleSubmit} className='d-inline col-9 mr-2'>
            <InputGroup>
              <Form.Control       
                placeholder="Nunca dejes de buscar"
                className="mr-2"
                aria-label="Buscador"
                value={inputVal} 
                onChange={(e)=>setInputVal(e.target.value)}
                />
                <Button variant="light">
                  <img 
                  src="/ic_Search.png"
                  srcSet="/ic_Search@2x.png.png"
                  alt="Icono de busqueda"
                  />
                </Button>
            </InputGroup>
          </Form>    
        </Container>
      </Navbar>
    )
}