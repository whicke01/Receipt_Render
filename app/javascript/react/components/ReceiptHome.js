import React from 'react'

import ReceiptLinkButton from './ReceiptLinkButton'

const ReceiptHome = (props) => {

  return(
    <div className='main_div cell small-10'>
      <div className='grid-x grid-margin-x align-spaced'>
        <div className='cell small-10 home_header'>
          <h1>Welcome to Receipt Render!</h1>
          <p>The easiest way to split the bill and enjoy the good cheer.</p>
        </div>

        <ReceiptLinkButton url='/receipt/new' text='Add a Receipt'/>
        <ReceiptLinkButton url='/' text='Check Receipt History'/>
      </div>
    </div>
  )
}

export default ReceiptHome
