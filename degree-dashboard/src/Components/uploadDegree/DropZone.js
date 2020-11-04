import React, {useState} from 'react'
import { useDropzone } from 'react-dropzone'
import styles from "./UploadAudit.module.css"

function DropZone() {
  const [files, setFiles] = useState([])

  const {getRootProps, getInputProps} = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) => Object.assign(file, {
          preview: URL.createObjectURL(file)
        }))
      )
    }
  })

  const file = files.map((file) => (
    <div key={file.name}>
      {file.name}
    </div>
  ))

  return (
    <div>
      <div {...getRootProps()} className={styles.dropArea}>
        <input {...getInputProps()} />
        <h2 className={styles.dropText}>DRAG FILE HERE OR <span className={styles.browse}>BROWSE</span></h2>
      </div>
      <div className={styles.fileName}>{file}</div>
    </div>
    
  )

}

export default DropZone;