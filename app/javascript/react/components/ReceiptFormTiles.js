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

  const smallButtonClick = (event) => {
    event.preventDefault()

    if(event.currentTarget.dataset.quantity === 'plus') {
      setDinnerParty({
        ...dinnerParty,
        [event.currentTarget.dataset.field]: (dinnerParty.party_size + 1)
      })
    } else if(event.currentTarget.dataset.quantity === 'minus') {
      setDinnerParty({
        ...dinnerParty,
        [event.currentTarget.dataset.field]: (dinnerParty.party_size - 1)
      })
    }
  }

  const onEdit = (guest_id, name) => {
    let tempGuests = dinnerParty.guests
    tempGuests[guest_id] = name

    setDinnerParty({
      ...dinnerParty,
      guests: tempGuests
    })

  }

  if(props.form_number === 1) {
    return(
      <>
        <h3>Party Size (how many people are splitting the bill):</h3>
        <div className='grid-x grid-margin-x align-spaced'>
          <form onSubmit={props.onNextClick}>
            <div className="cell small-10 input-group plus-minus-input">
              <div className="input-group-button">
                <button 
                  type="button" 
                  className="button hollow circle" 
                  data-quantity="minus" 
                  data-field="party_size"
                  onClick={smallButtonClick}
                  >
                  <i className="fa fa-minus" aria-hidden="true"></i>
                </button>
              </div>

              <input 
                className="input-group-field" 
                type="number" 
                name="party_size" 
                value={dinnerParty.party_size} 
                onChange={handleChange}
              />

              <div className="input-group-button">
                <button 
                  type="button" 
                  className="button hollow circle" 
                  data-quantity="plus" 
                  data-field="party_size"
                  onClick={smallButtonClick}
                  >
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </button>
              </div>
            </div>

            <div>
              <label className='rest_name_input' htmlFor='restaurant'> Restaurant name:
                <input type='text' name='restaurant' value={dinnerParty.restaurant} onChange={handleChange}/>
              </label>
            </div>

            <input type='submit' value='Next' className='home_button next_button'/>
          </form>
        </div>
      </>
    )
  } else if(props.form_number === 2) {
    let guests = new Array(dinnerParty.party_size)

    for( let i = 0; i < dinnerParty.party_size; i++ ) {
      guests[i] = <GuestTile 
        key={i+1}
        id={i}
        name={`Guest ${i+1}`} 
        onEdit={onEdit}
      />
    }

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
