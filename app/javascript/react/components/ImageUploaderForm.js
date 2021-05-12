import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Dropzone from 'react-dropzone'

const ImageUploaderForm = (props) => {
  const [state, setState] = useState({

  })

  const handleFileUpload = (acceptedFiles) => {
    let tempReceit = props.receipt
    tempReceit.image = acceptedFiles[0]
    props.onNextClick(tempReceit)
  }

  const onNext = (event) => {
    event.preventDefault()

    let newReceipt = props.receipt
    if(event.currentTarget.name === 'next') {
      newReceipt.form_number = props.receipt.form_number + 1
    } else if(event.currentTarget.name === 'previous') {
      newReceipt.form_number = props.receipt.form_number - 1
    }
    props.onNextClick(newReceipt)
    setState({
      ...state,
      shouldRedirect: newReceipt.form_number
    })
  }

  if(state.shouldRedirect) {
    return <Redirect push to={`/receipt/new/${state.shouldRedirect}`} />
  }

  return(
    <>
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