import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'

import GuestTile from './GuestTile'

const GuestNamesForm = (props) => {
  const [guests, setGuests] = useState({
    names: props.receipt.guests,
    shouldRedirect: 0
  })

  useEffect( ()=>{
    setPlaceHolders()
  }, [])

  const setPlaceHolders = () => {
    let firstArray = new Array(props.receipt.party_size)

    if(guests.names.length === 0) {
      for( let i = 0; i < props.receipt.party_size; i++ ) {
        firstArray[i] = `Guest ${i + 1}`
      }
      setGuests({
        ...guests,
        names: firstArray
      })
    }
  }

  const onEdit = (guest_id, name) => {
    let tempGuests = guests.names
    tempGuests[guest_id] = name

    let tempReceipt = props.receipt
    tempReceipt.guests = tempGuests
    props.onNextClick(tempReceipt)
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

  const onNext = (event) => {
    event.preventDefault()

    let newReceipt = props.receipt
    if(event.currentTarget.name === 'next') {
      newReceipt.form_number = props.receipt.form_number + 1
    } else if(event.currentTarget.name === 'previous') {
      newReceipt.form_number = props.receipt.form_number - 1
    }
    newReceipt.guests = guests.names
    props.onNextClick(newReceipt)
    setGuests({
      ...guests,
      shouldRedirect: newReceipt.form_number
    })
  }

  if(guests.shouldRedirect) {
    return <Redirect push to={`/receipt/new/${guests.shouldRedirect}`} />
  }

  return(
    <>
      <div className='cell small-11'>
        {guestsTiles}
      </div>
      <div className='cell medium-6'>
        <button onClick={onNext} name='previous' className='home_button next_button'>Previous</button>
      </div>

      <div className='cell medium-6'>
        <button onClick={onNext} name='next' className='home_button next_button'>Next</button>
      </div>
    </>
  )
}

export default GuestNamesForm
