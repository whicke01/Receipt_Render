import React from 'react'

const FormReview = (props) => {

  const onClickSubmit= (event) => {
    props.addReceipt()
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
