import React from 'react'

import Dropzone from 'react-dropzone'

const ImageUploaderForm = (props) => {

  const handleFileUpload = (acceptedFiles) => {
    let tempReceit = props.receipt
    tempReceit.image = acceptedFiles[0]
    props.onNextClick(tempReceit)
  }

  return(
    <div className="duck-form">
      <form className="callout" onSubmit={props.onNextClick}>
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

        <input className="button" type="submit" value="Submit"/>
      </form>
    </div>
  )
}

export default ImageUploaderForm