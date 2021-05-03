import React, { useState, useEffect } from 'react'

const ReceiptForm = (props) => {

  return(
    <div className='main_div cell small-10'>
      <div className='grid-x grid-margin-x align-spaced'>
        <div className='cell small-10 home_header'>
          <h1>Create a Party:</h1>
        </div>

        <div>
          <h3>Form Goes Here.</h3>
        </div>

        <div className='cell small-7 home_button'>
          <h3><button type='btn'>Next</button></h3>
        </div>
      </div>
    </div>
  )
}

export default ReceiptForm