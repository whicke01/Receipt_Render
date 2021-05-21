import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Dropzone from 'react-dropzone'

const ImageUploaderForm = (props) => {
  const [state, setState] = useState({
    pictureFlag: false,
    shouldRedirect: NaN,
    photoUploaded: null
  })

  const handleFileUpload = (acceptedFiles) => {
    let tempReceit = props.receipt
    tempReceit.image = acceptedFiles[0]
    props.onNextClick(tempReceit)
    
    const tempState = state
    tempState.pictureFlag = true

    setState({
      ...state,
      pictureFlag: true
    })
  }

  const onNext = (event) => {
    event.preventDefault()

    let newReceipt = props.receipt
    if(event.currentTarget.name === 'next') {
      newReceipt.form_number = props.receipt.form_number + 1

      if(state.pictureFlag) {
        setState({
          ...state,
          shouldRedirect: newReceipt.form_number
        })
        props.onNextClick(newReceipt)
      } else {
        setState({
          ...state,
          photoUploaded: <h4>Please add a picture of the receipt before clicking 'Next'</h4>
        })
      }
    } else if(event.currentTarget.name === 'previous') {
      newReceipt.form_number = props.receipt.form_number - 1

      setState({
        ...state,
        shouldRedirect: newReceipt.form_number
      })
      props.onNextClick(newReceipt)
    }
  }

  if(state.shouldRedirect) {
    return <Redirect push to={`/receipt/new/${state.shouldRedirect}`} />
  }

  let photoStatus = null
  if(state.pictureFlag) {
    photoStatus = <h4>You have added a photo.</h4>
  } else {
    photoStatus = state.photoUploaded
  }

  return(
    <>
      {photoStatus}
      <div className="cell small-10 image_drop_div">
        <form className="callout">
          <Dropzone onDrop={handleFileUpload}>
            {({getRootProps, getInputProps}) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
                </div>
              </section>
            )}
          </Dropzone>
        </form>
      </div> 
      
      <div className='cell small-4'>
        <button onClick={onNext} name='previous' className='home_button next_button'>Previous</button>
      </div>
      
      <div className='cell small-4'>
        <button onClick={onNext} name='next' className='home_button next_button'>Next</button>
      </div>
    </>
  )
}

export default ImageUploaderForm