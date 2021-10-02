import'./search.scss'
import{useEffect, useState} from "react"
import useAsync from "../../hooks/useAsync";
import Navbar from "react-bootstrap/Navbar";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Container from 'react-bootstrap/esm/Container';

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
                aria-label="Search"
                value={inputVal} 
                onChange={(e)=>setInputVal(e.target.value)}
                />
              <Button variant="secondary">Search</Button>
            </InputGroup>
          </Form>    
        </Container>
      </Navbar>
    )
}