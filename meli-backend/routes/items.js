import {Router} from "express"
import axios from "axios";
import {author} from "../constants.js"
import { mapItemDetail, mapItemsList } from "../itemsMapper.js";
const router = Router();

router.get('/',  function(req, res, next) {
  const {q:query} = req.query
  console.log(query)
  if(query) {
    axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`)
      .then(function (response) {
        console.log('request',response.request)
        console.log('headers',response.headers)
        const {filters, results:items} = response.data;
        if(items){
          res.send(mapItemsList(filters,items))
        }else {
          res.send('No se encontraron resultados')
        }
      })
      .catch(next)

  }else { 
    res.send("ok")
  }
  
});

router.get('/:id', (req,res,next)=>{
  const {id} = req.params

  Promise.all([axios.get(`https://api.mercadolibre.com/items/${id}`),axios.get(`https://api.mercadolibre.com/items/${id}/description`)]).then((responses)=>{
        const [detail, description] = responses;
        res.send(mapItemDetail(detail.data, description.data))
  }).catch(next)
})

export default router
