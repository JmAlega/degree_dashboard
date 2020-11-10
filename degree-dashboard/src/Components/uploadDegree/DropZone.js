import React, {useState, useCallback} from 'react'
import { useDropzone } from 'react-dropzone'
import styles from "./UploadAudit.module.css"
const axios = require('axios');

function DropZone() {
  
  const uploadFile = ({target: {files} }) => {
    var data = new FormData();
    // data.append( 'audit', files[0])

    var file = document.getElementById("audit").files[0];

    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            document.getElementById("audit").innerHTML = evt.target.result;
            console.log(reader.result)

            
        }
        reader.onerror = function (evt) {
            document.getElementById("audit").innerHTML = "error reading file";
        }
    }
    // console.log(file);
    data.append('email' , "av4k2@umsystem.edu");
    data.append('audit', reader.result);
    handleSubmit(data);
  }

  const [percent, setPercent] = useState(0);

  function OnUploadProgress (progressEvent) {
    const{loaded, total} = progressEvent;
    var percentCompleted = Math.round((loaded * 100) / total);
    return percentCompleted;
  }

  const handleSubmit = (data) => {
    // degree_audit.preventDefault()
    axios.post('http://localhost:8000/api/uploadAudit', data)
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

  const {getRootProps, getInputProps} = useDropzone({uploadFile})

  // var file_name = document.getElementById("audit").files[0].name;
  // const audit = file_name => (
  //   <div key={file_name}>
  //     {file_name}
  //   </div>
  // );

  return (
    <div onSubmit={handleSubmit}>
      <div {...getRootProps()} className={styles.dropArea}>
        <input {...getInputProps()} id="audit" onChange={uploadFile} />
        <h2 className={styles.dropText}>DRAG FILE HERE OR <span className={styles.browse}>BROWSE</span></h2>
      </div>
      <div className={styles.fileName}>Test</div>
    </div>
    
  )

}

export default DropZone;