import React,{useState} from 'react'
import useFireStore from '../Hooks/useFireStore'
import {motion} from 'framer-motion';
import { projectFireStore } from '../firebase';

const deleteOneImageDoc = async (doc) => {
  try {
   await projectFireStore.collection('images').doc(doc.id).delete();
  } catch (ex) {
    console.error(`Failed to delete the Image: ${ex.message}`);
    throw ex;
  }
};

// image grid
const ImageGrid=({setSelectedImg})=>{
var [searchTerm, setSearchTerm] = useState(null);
var {docs} = useFireStore('images');

const handleChange = (event) => {
 setSearchTerm(event.target.value);
}

const clearSearch = () =>
{
  setSearchTerm(null);
}

  return(
    <div>
    <input type="text" placeholder="Enter image name to search..." value={searchTerm} onChange={handleChange}></input>
    <button className='clear-button' onClick={clearSearch}>Clear</button>
    <div className="img-grid">
        { searchTerm===null && docs && docs.map(doc=>(
            <motion.div
            className="imag-wrap" 
            key={doc.id}
            layout
            whileHover={{opacity:1}}
            >
            <motion.img src={doc.url} 
            alt={doc.id} 
            initial={{opacity:0, height:400, width:300}}
            animate={{opacity:1}}
            onClick={()=>
            setSelectedImg(doc.url)}
            />
            <button className="delete-button" onClick={() => deleteOneImageDoc(doc)}>Delete</button>
            <div> Name:{doc.id}</div>
            </motion.div> 
        ))}
        { searchTerm!==null && docs && docs.map(doc=>(
          doc.id.includes(searchTerm) &&
            <motion.div
            className="imag-wrap" 
            key={doc.id}
            layout
            >
            <motion.img src={doc.url} 
            alt={doc.id} 
            initial={{opacity:0, height:400, width:300}}
            animate={{opacity:1}}
            whileHover={{opacity:1}}
            onClick={()=>
            setSelectedImg(doc.url)}
            />
            <button className="delete-button" onClick={() => deleteOneImageDoc(doc)}>Delete</button>
            <div> Name:{doc.id}</div>
            </motion.div> 
        ))}
        </div>
        </div>
  )
}

export default ImageGrid;