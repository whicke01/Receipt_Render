import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import ItemTile from './ItemTile'

const ItemIndex = (props) => {
  const [party, setParty] = useState({
    receipt_id: props.match.params.id,
    receipt: {},
    items: [],
    redraw: true
  })

  const fetchParty = async () => {
    try {
      const response = await fetch(`/api/v1/receipts/${props.match.params.id}/items`)
      if(!response.ok) {
        const errorMessage = `${response.status} (${response.statusTest})`
        const error = new Error(errorMessage)
        throw(error)
      }
      const parsedResponse = await response.json()
      const receiptItems = parsedResponse.receipt.items
      const receipt = {
        id: parsedResponse.receipt.id, 
        tax: parsedResponse.receipt.tax, 
        restaurant: parsedResponse.receipt.restaurant, 
        image_url: parsedResponse.receipt.image_url
      }
      const newParty = party
      newParty.receipt = receipt
      newParty.items = receiptItems
      setParty(newParty)

    } catch(error) {
      console.error(`Error in Items fetch: ${error.message}`)
    }
  }

  useEffect( () => {
    fetchParty()
    if(party.redraw) {
      setParty({
        ...party,
        redraw: false
      })
    }
  }, [])
  
  let itemTilesArray = party.items.map( (item) => {
    
    return(
      <ItemTile key={item.id} item={item} />
      )
  })

  return(
    <div className='main_div cell small-10'>
      <h1>Hello From the item Show page</h1>
      <ul>
        {itemTilesArray}
      </ul>
    </div>
  )
}

export default ItemIndex
