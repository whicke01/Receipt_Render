import React, { useState } from 'react'

const ItemTile = (props) => {
  const [lineItem, setLineItem] = useState({
    price: props.item.price,
    name: props.item.name,
    quantity: props.item.quantity
  })

  return(
    <div className='grid-x grid-margin-x align-spaced'>
      <div className='cell small-3'>{lineItem.quantity}</div>
      <div className='cell small-3'>{lineItem.name}</div>
      <div className='cell small-3'>{lineItem.price}</div>
    </div>
  )
}

export default ItemTile