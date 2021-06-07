import React, { useState, useEffect } from 'react'

import ItemTile from './ItemTile'

const ItemIndex = (props) => {
  const [party, setParty] = useState({
    receipt_id: props.match.params.id,
    guests: [],
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
      newParty.guests = setGuests()
      setParty(newParty)

    } catch(error) {
      console.error(`Error in Items fetch: ${error.message}`)
    }
  }

  const setGuests = () => {
    const newGuests = props.location.state.guests.map( (guest) => {
      return {name: guest, amount: 0.00}
    })
    return newGuests
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

  const setGuestAmount = (name, price, previousGuest) => {
    const updatedGuests = party.guests
    const selectedGuest = updatedGuests.find( (guest) => guest.name === name)
    selectedGuest.amount += parseFloat(price)

    setParty({
      ...party,
      guests: updatedGuests
    })
  }

  const editItemField = (id, fieldName, fieldValue, selectedGuest) => {
    const updatedItems = party.items
    const selectedItem = updatedItems.find( (item) => item.id === id)
    selectedItem[fieldName] = fieldValue

    if(fieldName === 'price' && selectedGuest) {
      setGuestAmount(selectedGuest, fieldValue)
    } else {
      setParty({
        ...party,
        item: updatedItems
      })
    }
  }
  
  const guestAmount = party.guests.map( (guest, index) => {
    return(<p key={index}>Name: {guest.name}, total: ${guest.amount}</p>)
  })

  let itemTilesArray = party.items.map( (item) => {
    return(
      <ItemTile 
        key={item.id}
        id={item.id} 
        item={item} 
        guests={party.guests}
        selectGuest={setGuestAmount}
        editItemField={editItemField}
      />
    )
  })

  return(
    <div className='main_div cell small-10'>
      <h1>The Split</h1>
      <ul>{guestAmount}</ul>
      <ul>
        {itemTilesArray}
      </ul>
    </div>
  )
}

export default ItemIndex
