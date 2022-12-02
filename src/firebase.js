import * as firebase  from 'firebase/firebase'
import 'firebase/storage'
import 'firebase/firestore'
 
 // Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBXl2cwry-rIFV5dXCkydIYHOcIVkPphHE",
  authDomain: "ip1-assignment-3-galleryapp.firebaseapp.com",
  projectId: "ip1-assignment-3-galleryapp",
  storageBucket: "ip1-assignment-3-galleryapp.appspot.com",
  messagingSenderId: "965240492792",
  appId: "1:965240492792:web:61a3670aca33be32b0210d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage=firebase.storage();
const projectFireStore=firebase.firestore();
const timestamp=firebase.firestore.FieldValue.serverTimestamp;

export  {projectStorage,projectFireStore,timestamp}