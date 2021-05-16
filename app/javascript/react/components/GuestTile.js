import React, { useState } from 'react'

const GuestTile = (props) => {
  const [guest, setGuest] = useState({
    id: props.id,
    name: props.name,
    editable: false
  })

  const handleChange = (event) => {
    event.preventDefault()

    setGuest({
      ...guest,
      [event.currentTarget.name]: event.currentTarget.value
    })
  }

  const onEditClick = (event) => {
    event.preventDefault()

    setGuest({
      ...guest,
      editable: !guest.editable
    })
    
    props.onEdit(props.id, guest.name)
  }

  let guestTile 
  if(guest.editable === true) {
    guestTile = (
      <div className='guest_name_edit'>
        <input className='guest_input_edit' type='text' value={guest.name} name='name' onChange={handleChange} />
        <button className='save_button' onClick={onEditClick}>
          <i className="fas fa-save save_icon"></i>
        </button>
      </div>
    )
  } else {
    guestTile = (
      <span className='guest_name'>{guest.name} 
        <button className='edit_button' onClick={onEditClick}>
          <i className="fas fa-edit"></i>
        </button>
      </span>
    )
  }

  return(
    <div className='cell small-7 align-spaced guest_tile'>
      {guestTile}

    </div>
  )
}

export default GuestTile