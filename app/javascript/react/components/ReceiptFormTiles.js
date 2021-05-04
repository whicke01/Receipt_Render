import React, { useState, useEffect } from 'react'

const ReceiptFormTiles = (props) => {
  const [dinnerParty, setDinnerParty] = useState({
    restaurant: "",
    party_size: 1
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

  if(props.form_number === 1) {
    return(
      <>
        <h3>This is the 1st form for getting number of guests and restaurant name</h3>
        <p>Party size (how many people are splitting the bill):</p>
        <div className='grid-x grid-margin-x align-spaced'>
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
        </div>

        <button className='cell home_button' onClick={props.onNextClick}><h3>Next</h3></button>
      </>
    )
  } else if(props.form_number === 2) {
    return(
      <h3>This is the 2nd form for setting Guest's names, {dinnerParty.party_size}</h3>
    )
  } else if(props.form_number === 3) {
    return(
      <h3>This is the 3rd form for uploading a picture</h3>
    )
  }
}

export default ReceiptFormTiles
