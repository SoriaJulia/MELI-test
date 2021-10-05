import {author} from "./constants.js"

function getInactiveCategories(categories, active){
    return categories.filter((category)=>{
      return category.name !== active
    }).map(category=>{return category.name})
  }
  function getOrderedCategories(filters){
    const{path_from_root, name}= filters[0].values[0];
    return [...getInactiveCategories(path_from_root, name), name]
  }

const mapItemsList = (filters, items)=>{
    const filteredItems = items.slice(0,4);
    return {
        author,
        categories: filters[0].values.length > 0 ? getOrderedCategories(filters): [],
        items: filteredItems.map((item)=>{
                return    {
                    id: item.id,
                    title: item.title,
                    price: {
                        currency: item.currency_id,
                        amount: item.price
                    },
                    picture: item.thumbnail,
                    condition: item.condition,
                    free_shipping: item.shipping.free_shipping,
                    state: item.address.state_name
                    }
        })
    }
}

const mapItemDetail = (detail, description) => {
 return {
    author,
    item: {
    id: detail.id,
    title: detail.title,
    price: {
    currency: detail.currency_id,
    amount: detail.price,
    },
    picture: detail.pictures[0].url,
    condition: detail.condition,
    free_shipping: detail.shipping.free_shipping,
    sold_quantity: detail.sold_quantity,
    description: description.plain_text
    }
   }
   
}

export {mapItemDetail, mapItemsList};