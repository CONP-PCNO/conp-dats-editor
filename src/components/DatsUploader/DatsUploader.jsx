import React, { useMemo, useCallback, Fragment } from 'react'
import { useDropzone } from 'react-dropzone'

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
}

const activeStyle = {
  borderColor: '#2196f3'
}

const acceptStyle = {
  borderColor: '#00e676'
}

const rejectStyle = {
  borderColor: '#ff1744'
}

const DatsUploader = (props) => {
  const { onDatsReceived } = props
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
  
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const json = JSON.parse(reader.result);
        //console.log(json);
        onDatsReceived(json);
      };
      reader.readAsText(file);
    });
  }, [onDatsReceived]);
  

  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({ onDrop: onDrop, accept: 'application/json' })

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject, isDragAccept]
  )

  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
        {file.path} - {file.size} bytes
    </li>
  ))

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ))

  return (
    <div className='container'>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Upload your DATS.json file here</p>
        <em>(Only *.json files will be accepted)</em>
      </div>
      {acceptedFiles.length > 0 && (
        <div style={{ paddingTop: '20px' }}>
          <span style={{ color: 'limegreen', fontSize: '34px' }}>✔</span>
          <span style={{ paddingLeft: '10px' }}>
            {acceptedFiles[0].path} - {acceptedFiles[0].size} bytes
          </span>
        </div>
      )}
      {fileRejections.length > 0 && (
        <div style={{ paddingTop: '20px' }}>
          <span style={{ color: 'red' , fontSize: '34px'}}>✘</span>
          <span style={{ paddingLeft: '10px' }}>
            {fileRejections[0].file.path} - {fileRejections[0].file.size} bytes
          </span>
          <ul>
            {fileRejections[0].errors.map((e, index) => (
              <li key={index}>Reason: {e.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  ); 
}

export default DatsUploader
