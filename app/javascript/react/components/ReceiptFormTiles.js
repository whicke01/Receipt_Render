import React, { useState, useEffect } from 'react'

import GuestTile from './GuestTile'

const ReceiptFormTiles = (props) => {
  const [dinnerParty, setDinnerParty] = useState({
    restaurant: "",
    party_size: 1,
    guests: []
  })

  const handleChange = (event) => {
    event.preventDefault()

    setDinnerParty({
      ...dinnerParty,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  if(props.form_number === 2) {
    // let guests = new Array(dinnerParty.party_size)

    // for( let i = 0; i < dinnerParty.party_size; i++ ) {
    //   guests[i] = <GuestTile 
    //     key={i+1}
    //     id={i}
    //     name={`Guest ${i+1}`} 
    //     onEdit={onEdit}
    //   />
    // }

    return(
      <>
        {guests}
      </>
    )
  } else if(props.form_number === 3) {
    return(
      <h3>This is the 3rd form for uploading a picture</h3>
    )
  }
}

export default ReceiptFormTiles
