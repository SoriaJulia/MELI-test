import'./search.scss'
import{useEffect, useState, memo} from "react"
import useAsync from "../../hooks/useAsync";
import Navbar from "react-bootstrap/Navbar";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import InputGroup from 'react-bootstrap/InputGroup'
import Container from 'react-bootstrap/esm/Container';
import { useLocation} from 'react-router';
import useNavigate from '../../hooks/useNavigate';


export default function Search(props){
  const [inputVal, setInputVal] = useState("");
  const {search} = useLocation();
  const navigate = useNavigate()
  useEffect(()=>{
    const regex = /^\?search+=([\w-]*)?$/;
    let searchValue = '';
    if(regex.test(search)){
      searchValue = regex.exec(search).slice(-1) 
    }
    setInputVal(searchValue)
  },[search])
  
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/items?search=${inputVal}`)
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
                <Button variant="light" type="submit">
                  <img 
                  src="/ic_Search.png"
                  srcSet="/ic_Search@2x.png.png"
                  alt="Icono de busqueda"
                  height="18px"
                  />
                </Button>
            </InputGroup>
          </Form>    
        </Container>
      </Navbar>
    )
}