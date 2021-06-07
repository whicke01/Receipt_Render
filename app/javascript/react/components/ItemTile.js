import React, { useState } from 'react'

const ItemTile = (props) => {
  const [lineItem, setLineItem] = useState({
    price: props.item.price,
    name: props.item.name,
    quantity: props.item.quantity,
    guest: '',
    selectedGuest: ''
  })

  lineItem.price? '' : (lineItem.price = 0.00)
  lineItem.quantity? '' : (lineItem.quantity = 1)

  const handleSelectGuest = (event) => {
    event.preventDefault()
    props.selectGuest(event.currentTarget.value, lineItem.price)

    setLineItem({
      ...lineItem,
      selectedGuest: event.currentTarget.value
    })
  }

  const HandleFieldChange = (event) => {
    event.preventDefault()
    const fieldName = event.currentTarget.id
    const fieldValue = event.currentTarget.value

    props.editItemField(props.id, fieldName, fieldValue, lineItem.selectedGuest)

    setLineItem({
      ...lineItem,
      [fieldName]: fieldValue
    })
  }

  const guestOptions2 = props.guests.map( (guest) => {
    return(<option key={guest.name} value={guest.name}>{guest.name}</option>)
  })

  const guestOptions = [<option key={'001'} value={''}> </option>].concat(guestOptions2)

  return(
    <div className='item_tile grid-x align-spaced'>

      <form>
        <div className='cell small-3 item_input'>
          <label htmlFor="quantity">Quantity:
            <input 
              id="quantity"
              name="quantity"
              type="number" 
              value={lineItem.quantity}
              onChange={HandleFieldChange}
            />
          </label>
        </div>

        <div className='cell small-3 item_input'>
          <label htmlFor="name"> Item:
            <input 
              id="name"
              name="name"
              type="text" 
              value={lineItem.name}
              onChange={HandleFieldChange}
            />
          </label>
        </div>

        <div className='cell small-3 item_input'>
          <label htmlFor="price"> Price:
            <input 
              id="price"
              name="price"
              type="number" 
              step="0.01"
              value={lineItem.price}
              onChange={HandleFieldChange}
            />
          </label>
        </div>

        <div className='cell small-2'>
          <label htmlFor='guest'> Belongs to:
            <select id='guest' name='guest' value={lineItem.selectedGuest} onChange={handleSelectGuest}>
              {guestOptions}
            </select>
          </label>
        </div>

        <div className='cell small-1'>
          <p>delete</p>
        </div>
      </form>

    </div>
  )
}

export default ItemTile