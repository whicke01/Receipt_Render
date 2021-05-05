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
    guestsTiles[i] = <GuestTile 
      key={i+1}
      id={i}
      name={`Guest ${i+1}`} 
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
