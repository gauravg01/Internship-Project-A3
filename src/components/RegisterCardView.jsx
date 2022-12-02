import React from 'react'
import '../styles/RegisterCardView.css'

import { MdPassword } from "react-icons/md";
import { MdPhone } from "react-icons/md";
import { MdMessage } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { MdAccountCircle } from "react-icons/md";
import { useState, useRef } from "react";

function UpdateCardView() {

    const [userName, setName] = useState("");
    const [userBio, setBio] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [userEmail, setuserEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setImage] = useState("");

    const inputRef = useRef(null);
    const handleClick = () => {
      inputRef.current.click();
    };

    const fetchData = () => {
        if(confirmPassword!=password){
            alert("Passwords don't match")
            return
        }
        var formdata = new FormData();
        formdata.append("userEmail", userEmail);
        formdata.append("password", password);
        formdata.append("confirmPassword", password);
        formdata.append("userName", userName);
        formdata.append("userBio", userBio);
        formdata.append("userMobileNo", phone);
        formdata.append("image", image);


        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };



        fetch("https://70e2-142-117-129-15.ngrok.io/authentication/rest/registration", requestOptions)
            .then(response => response.text())
            .then(result => {console.log(result); var obj = JSON.parse(result); if(obj['status']=='success') alert('Registered'); else alert('Error');})
            .catch(error => console.log('error', error));
            }

  return (
    <div className='card-1'>
        <div className='update-text'>Enter your details</div>

       <table className='container-items-1'>
            <tr>
                <td><MdMessage className='container-img-1'/></td>
                <td className='container-item-1'>        
                    <input className='input-1'  onChange={(e) => setBio(e.target.value)} type='text' placeholder='Enter your bio' name='uname' required />
                </td>
            </tr>
            <tr>
                <td><MdAccountCircle className='container-img-1'/></td>
                <td className='container-item-1'>
                    <input className='input-1' onChange={(e) => setName(e.target.value)} type='text' placeholder='Enter your name' name='uname' required />
                </td>
            </tr>
            <tr>
                <td><MdEmail className='container-img-1'/></td>
                <td className='container-item-1'>
                    <input className='input-1' onChange={(e) => setuserEmail(e.target.value)} type='text' placeholder='Enter your email' name='uname' required />
                </td>
            </tr>
            <tr>
                <td><MdPassword className='container-img-1'/></td>
                <td className='container-item-1'>
                    <input className='input-1' onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Enter your password' name='uname' required />
                </td>
            </tr>
            <tr>
                <td><MdPassword className='container-img-1'/></td>
                <td className='container-item-1'>
                    <input className='input-1' onChange={(e) => setConfirmPassword(e.target.value)} type='password' placeholder='Confirm password' name='uname' required />
                </td>
            </tr>
            <tr>
                <td><MdPhone className='container-img-1'/></td>
                <td className='container-item-1'>                    
                    <input className='input-1' onChange={(e) => setPhone(e.target.value)} type='text' placeholder='Enter your phone number' name='uname' required />
                </td>
            </tr>
            <tr>
                <td><button className='container-button-1' onClick={handleClick} >Select</button></td>
                <td className='container-item-1'>                    
                    <input className='input-1' type='file' onChange={(e) => setImage(e.target.files[0])} ref={inputRef} style={{paddingTop:10, paddingLeft:2}} placeholder='Select your image file' name='uname' required />
                </td>
            </tr>
          </table>
        <button className='container-button-2' onClick={fetchData}>Submit</button>
    </div>
  )
}

export default UpdateCardView