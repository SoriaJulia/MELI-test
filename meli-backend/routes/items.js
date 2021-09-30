import {Router} from "express"
import axios from "axios";
const router = Router();

/* GET users listing. */
router.get('/',  function(req, res, next) {
  const {q:query} = req.query
  if(query) {
    axios.get(`https://api.mercadolibre.com/sites/MLA/search?q=${query}`)
      .then(function (response) {
        // handle success
        res.send(response.data.results)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

  }else { 
    res.send("ok")
  }
  
});

export default router
