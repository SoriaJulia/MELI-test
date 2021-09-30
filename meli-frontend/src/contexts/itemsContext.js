import { createContext, useContext, useReducer, useState } from "react";

function itemsReducer(state, action){
    switch (action.type){

        case "setItemsList": {
            return {...state, items:action.payload.items};
        }
        case "setItemDetail": {
            return state

        }
        case "clear":{ 
            return state
        } 
        default:{
            return state
        }
    }
}
const ItemsContext = createContext();
export default function ItemsProvider(props){
    const [state, dispatch] = useReducer(itemsReducer,{id:null, items:[], detail:null});
    return <ItemsContext.Provider value={{state, dispatch}} {...props}/> 
}

export function useItems(){
    const context = useContext(ItemsContext);
    if(!context){
        throw new Error("useItems must be used within an ItemsProvider");
    }
    return context
}