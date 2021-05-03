import React from 'react'
import { Link } from 'react-router-dom'

const ReceiptHome = (props) => {

  return(
    <div className='main_div cell small-10'>
      <div className='grid-x grid-margin-x align-spaced'>
        <div className='cell small-10 home_header'>
          <h1>Welcome to Receipt Render!</h1>
        </div>

        <div className='cell small-7 home_button'>
          <h3><Link to={'/Receipt/new'}>Add a Receipt</Link></h3>
        </div>

        <div className='cell small-7 home_button'>
          <h3><Link to={'/'}>Check Receipt History</Link></h3>
        </div>
      </div>

    </div>
  )
}

export default ReceiptHome