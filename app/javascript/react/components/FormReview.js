import React, { useState} from 'react'
import { Redirect } from 'react-router-dom'

const FormReview = (props) => {
  const [newReceipt, setNewReceipt] = useState({
    id: props.receipt.id,
    form_number: props.receipt.form_number,
    party_size: props.receipt.party_size,
    restaurant: props.receipt.restaurant,
    guests: props.receipt.guests,
    image: props.receipt.image,
    shouldRedirect: false
  })

  const redrawPage = () => {
    setNewReceipt({
      ...newReceipt,
      shouldRedirect: true
    })
  }

  const addReceipt = async () => {
    let body = new FormData()
    body.append('restaurant', newReceipt.restaurant)
    body.append('guests', newReceipt.guests)
    body.append('image', newReceipt.image)

    try {
      const response = await fetch("/api/v1/receipts", {
        method: 'POST',
        credentials: 'same-origin',
        body: body
      })
      if(!response.ok) {
        const errorMessage = `${response.status} (${response.statusText})`
        throw new Error(errorMessage)
      }
      const addedReceipt = await response.json()

      const addedNewReceipt = newReceipt
      addedNewReceipt.id = addedReceipt.receipt.id

      setNewReceipt(addedNewReceipt)

    } catch(error) {
      console.error(`Error in post fetch: ${error.message}`)
    }
  }

  const onClickSubmit= (event) => {
    event.preventDefault()
    addReceipt()
    redrawPage()
  }

  if(newReceipt.id) {
    return <Redirect push to={`/receipt/${newReceipt.id}`} />
  }

  const guestNames = props.receipt.guests.map( (guest, index) => {
    return <p key={index} >Guest {index + 1}: {guest}</p>
  })


  return(
    <>
      <div className='cell small-10'>
        <h4>Restaurant: {props.receipt.restaurant}</h4>
      </div>

      <div className='cell small-10'>
        <ul>
          {guestNames}
        </ul>
      </div>
      
      {/* <img src={props.receipt.image.path} alt='image of your receipt'/> */}
      <div className='cell small-10'>
        <button onClick={onClickSubmit} className='home_button next_button'>Submit</button>
      </div>
    </>
  )
}

export default FormReview
