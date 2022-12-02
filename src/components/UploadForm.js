import React,{useState} from 'react'
import ProgressBar from './ProgressBar';

const UploadForm=()=>{
      const[file,setFile]=useState(null);
      const [error,setError]=useState(null);

      const types=['impage/png','image/jpeg'];

     const changedHandeler=(e)=>{
          let selected=e.target.files[0];
          if(selected && types.includes(selected.type)){
              setFile(selected);
              setError('');
          }else{
              setFile(null);
              setError('please select an image file (png or jpeg)');
          }
     }
    return(

         <form>
        <label>
            <span>+</span>
         <input type="file"  onChange={changedHandeler} />
          </label>
          <div className="output">
              {
                  error && <div className="error"> {error} </div>      
               } 
              
                {  file && <div className="file">{file.name}</div> }

                {  file && <ProgressBar  file={file}  setFile={setFile}/>}
              
          </div>
         </form>

    )
}

export default UploadForm;