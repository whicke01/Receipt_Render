import React, { useState } from 'react'

import GuestTile from './GuestTile'
import ReceiptLinkButton from './ReceiptLinkButton'

const GuestNamesForm = (props) => {
  const [guests, setGuests] = useState([])

  const onEdit = (guest_id, name) => {
    let tempGuests = guests
    tempGuests[guest_id] = name

    setGuests(tempGuests)
  }

  let guestsTiles = new Array(props.receipt.party_size)

  for( let i = 0; i < props.receipt.party_size; i++ ) {
    let guestName = `Guest ${i+1}`
    debugger
    props.receipt.guests[i]? (guestName = props.receipt.guests[i].name): ''
    guestsTiles[i] = <GuestTile 
      key={i+1}
      id={i}
      name={guestName} 
      onEdit={onEdit}
    />
  }

  return(
    <>
      <div className='cell small-11'>
        {guestsTiles}
      </div>
      <ReceiptLinkButton url={`/receipt/new/${props.receipt.form_number - 1}`} text='Previous'/>
      <ReceiptLinkButton url={`/receipt/new/${props.receipt.form_number + 1}`} text='Next'/>
    </>
  )
}

export default GuestNamesForm
