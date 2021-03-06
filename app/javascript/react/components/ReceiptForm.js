import React, { useState } from 'react'
import { Switch, Route } from 'react-router-dom'

import PartySizeForm from './PartySizeForm'
import GuestNamesForm from './GuestNamesForm'
import ImageUploaderForm from './ImageUploaderForm'
import FormReview from './FormReview'

const ReceiptForm = (props) => {
  const [newReceipt, setNewReceipt] = useState({
    id: null,
    form_number: 1,
    party_size: 1,
    restaurant: '',
    guests: [],
    image: ''
  })

  const onNextClick = (newData) => {
    setNewReceipt(newData)
  }

  return(
    <div className='main_div cell small-10'>
      <div className='grid-x grid-margin-x align-spaced'>
        <div className='cell small-10 home_header'>
          <h1>Create a dinner party:</h1>
        </div>

        <Switch>
          <Route exact path='/receipt/new/2'>
            <GuestNamesForm receipt={newReceipt} onNextClick={onNextClick}/>
          </Route>
          <Route exact path='/receipt/new/3'>
            <ImageUploaderForm receipt={newReceipt} onNextClick={onNextClick} />
          </Route>
          <Route exact path='/receipt/new/4'>
            <FormReview receipt={newReceipt} />
          </Route>
          <Route path='/receipt/new'>
            <PartySizeForm 
              receipt={newReceipt}
              onNextClick={onNextClick}
            />
          </Route>
        </Switch>

      </div>
    </div>
  )
}

export default ReceiptForm
