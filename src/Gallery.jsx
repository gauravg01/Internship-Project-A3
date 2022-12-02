import React,{useState} from 'react';
import ImageGrid from './components/ImageGrid';
import Modal from './components/Modal';
import Title from './components/Title';
import UploadForm from './components/UploadForm';

function Gallery() {
  const [selectedimg,setSelectedImg]=useState(null);
  return (
    <div className="GalleryApp">
      <Title/>
      <UploadForm/>
      <ImageGrid setSelectedImg={setSelectedImg} />

     {
       selectedimg &&
        <Modal selectedimg={selectedimg}
         setSelectedImg={setSelectedImg} />
     }
    </div>
  );
}

export default Gallery;
