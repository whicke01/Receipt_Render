import React from 'react'

const FormReview = (props) => {

  const onClickSubmit= (event) => {
    props.addReceipt()
  }

  const guestNames = props.receipt.guests.map( (guest, index) => {
    return <li key={index} >Guest {index + 1}: {guest}</li>
  })
  return(
    <>
      <h4>Restaurant: {props.receipt.restaurant}</h4>
      <ul>
        {guestNames}
      </ul>
      {/* <img src={props.receipt.image.path} alt='image of your receipt'/> */}

      <button onClick={onClickSubmit} className='home_button next_button'>Submit</button>
    </>
  )
}

export default FormReview
