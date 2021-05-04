import React, { useState, useEffect } from 'react'

import ReceiptFormTiles from './ReceiptFormTiles'

const ReceiptForm = (props) => {
  const [newReceipt, setNewReceipt] = useState({
    form_number: 1,
    party_size: 1,
    restaurant: ''
  })

  const onNextClick = () => {
    setNewReceipt({
      ...newReceipt,
      form_number: (newReceipt.form_number + 1)
    })
  }

  return(
    <div className='main_div cell small-10'>
      <div className='grid-x grid-margin-x align-spaced'>
        <div className='cell small-10 home_header'>
          <h1>Create a Party:</h1>
        </div>

        <div className='cell small-10'>
          <ReceiptFormTiles form_number={newReceipt.form_number} onNextClick={onNextClick}/>
        </div>
      </div>
    </div>
  )
}

export default ReceiptForm