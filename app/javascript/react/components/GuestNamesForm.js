import React, { useState, useEffect } from 'react'

import GuestTile from './GuestTile'
import ReceiptLinkButton from './ReceiptLinkButton'

const GuestNamesForm = (props) => {
  const [guests, setGuests] = useState(props.receipt.guests)

  useEffect( ()=>{
    setPlaceHolders()
  }, [])

  const setPlaceHolders = () => {
    let firstArray = new Array(props.receipt.party_size)

    if(guests.length === 0) {
      for( let i = 0; i < props.receipt.party_size; i++ ) {
        firstArray[i] = `Guest ${i + 1}`
      }
      setGuests(firstArray)
    }
  }

  const onEdit = (guest_id, name) => {
    let tempGuests = guests
    tempGuests[guest_id] = name

    let tempReceit = props.receipt
    tempReceit.guests = tempGuests
    props.onNextClick(tempReceit)
  }

  let guestsTiles = new Array(props.receipt.party_size)

  for( let i = 0; i < props.receipt.party_size; i++ ) {
    let guestName = `Guest ${i + 1}`
    props.receipt.guests[i]? (guestName = props.receipt.guests[i]): ('')
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
      <ReceiptLinkButton url={`/receipt/new/${props.receipt.form_number - 1}`} text='Previous' />
      <ReceiptLinkButton url={`/receipt/new/${props.receipt.form_number + 1}`} text='Next' />
    </>
  )
}

export default GuestNamesForm
