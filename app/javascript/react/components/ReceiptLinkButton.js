import React from 'react'
import { Link } from 'react-router-dom'

const ReceiptLinkButton = (props) => {

  return(
    <Link className='cell small-7 home_button' to={props.url}>
      <h3 className=''>
        {props.text}
      </h3>
    </Link>
  )
}

export default ReceiptLinkButton
