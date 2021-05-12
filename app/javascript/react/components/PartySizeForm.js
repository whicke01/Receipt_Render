import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

const PartySizeForm = (props) => {
  const [party, setParty] = useState({
    party_size: props.receipt.party_size,
    restaurant: props.receipt.restaurant,
    shouldRedirect: false
  })

  const handleChange = (event) => {
    event.preventDefault()

    setParty({
      ...party,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const smallButtonClick = (event) => {
    event.preventDefault()

    if(event.currentTarget.dataset.quantity === 'plus') {
      setParty({
        ...party,
        [event.currentTarget.dataset.field]: (party.party_size + 1)
      })
    } else if(event.currentTarget.dataset.quantity === 'minus') {
      setParty({
        ...party,
        [event.currentTarget.dataset.field]: (party.party_size - 1)
      })
    }
  }
  const onNext = (event) => {
    event.preventDefault()

    let newReceipt = props.receipt
    newReceipt.party_size = party.party_size
    newReceipt.restaurant = party.restaurant
    newReceipt.form_number = 2
    props.onNextClick(newReceipt)
    setParty({
      ...party,
      shouldRedirect: true
    })
  }

  if(party.shouldRedirect) {
    return <Redirect push to='/receipt/new/2' />
  }

  return(
    <>
      <div className=''>
      <h3>Party Size (how many people are splitting the bill):</h3>
        <form onSubmit={onNext}>
          <div className='grid-x grid-margin-x align-spaced'>
            <div className="input-group plus-minus-input align-spaced">
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
                value={party.party_size} 
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

            <div className='cell small-10'>
              <label className='rest_name_input' htmlFor='restaurant'> Restaurant name:
                <input type='text' name='restaurant' value={party.restaurant} onChange={handleChange}/>
              </label>
            </div>

            <input type='submit' value='Next' className='home_button next_button'/>
          </div>
        </form>
      </div>
    </>
  )
}

export default PartySizeForm
