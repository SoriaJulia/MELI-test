import {Router} from "express"
import axios from "axios";
import {author} from "../constants.js"
const router = Router();
function getInactiveCategories(categories, active){
  return categories.filter((category)=>{
    return category.name !== active
  }).map(category=>{return category.name})
}
function getOrderedCategories(filters){
  const{path_from_root, name}= filters[0].values[0];
  return [...getInactiveCategories(path_from_root, name), name]
}
router.get('/',  function(req, res, next) {
  const {q:query} = req.query
  if(query) {
    axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`)
      .then(function (response) {
        
        const {filters, results:items} = response.data;
        if(items){
          const filteredItems = items.slice(0,4);
          const formattedResponse = {
            author,
            items:filteredItems,
            categories: getOrderedCategories(filters)
          }
          res.send(formattedResponse)
        }else {
          res.send('No se encontraron resultados')
        }
      })
      .catch(function (error) {
        // handle errory
        console.log(error);
      })

  }else { 
    res.send("ok")
  }
  
});

router.get('/:id', (req,res,next)=>{
  const {id} = req.params
  console.log(id)
  axios.get(`https://api.mercadolibre.com/items/${id}`).then((response)=>{
    res.send(response.data)

  }).catch(function (error) {
    // handle errory
    console.log(error);
  })
})




export default router
