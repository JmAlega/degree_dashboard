import React, {useState, useCallback} from 'react'
import { useDropzone } from 'react-dropzone'
import styles from "./UploadAudit.module.css"
import Button from '@material-ui/core/Button';
const axios = require('axios');

function DropZone() {
  const [degree_audit, setDegree_audit] = useState([])
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader()

      reader.onload = () => {
        const binaryStr = reader.result
        console.log(binaryStr)
      }
      reader.readAsArrayBuffer(file)
    })
    
  }, [])

  const {getRootProps, getInputProps} = useDropzone({onDrop})

  const audit = degree_audit.map((file) => (
    <div key={file.name}>
      {file.name}
    </div>
  ))

  const handleSubmit = (degree_audit) => {
    degree_audit.preventDefault()
    axios.post('http://localhost:8000/api/uploadAudit', {
      audit: degree_audit
    })
    .then((res) => {
      if (res.status == 200) {
        console.log('Upload Successful');
      } else {
        console.log(res.error);
      }
    })
    .catch(err => {
      console.log(err)
    });
  }

  return (
    <div onSubmit={handleSubmit}>
      <div {...getRootProps()} className={styles.dropArea}>
        <input {...getInputProps()} />
        <h2 className={styles.dropText}>DRAG FILE HERE OR <span className={styles.browse}>BROWSE</span></h2>
      </div>
      <div className={styles.fileName}>{audit}</div>
      <Button variant="contained" type="submit" color="primary">
        Submit
      </Button>
    </div>
    
  )

}

export default DropZone;