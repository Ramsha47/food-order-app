// This is context API method

import { createContext, useReducer } from "react";

const cartContext = createContext({
    items:[],
    addItem: (item) =>{},
    removeItem: (id) =>{},
});

function cartReducer(state,action){
  if(action.type === 'ADD_ITEM'){
    const existingCartItemIndex = state.items.findIndex((item) =>item.id == action.item.id)
    const updatedItems = [...state.items]
    if(existingCartItemIndex > -1){

      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity : existingItem.quantity + 1
      }
      updatedItems[existingCartItemIndex] = updatedItem

    }
    else{
      updatedItems.push({...action.item , quantity: 1})
    }
    return {...state, updatedItems}
  }
  if(action.type === 'REMOVE_ITEM'){

  }
  return state
}


export function cartContextProvider({children}){
    useReducer(cartReducer,{item:[]})
    return (
        <cartContext.Provider>{children}</cartContext.Provider>
    )
}

export default cartContext