import React, { useState } from "react";
import './lf.css';
import 'boxicons'
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'animate.css';
function lf() {

    const [email, setem] = useState()
    const [password, setps] = useState()
    const navv=useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const handlelog =(e)=>{
      e.preventDefault()
      axios.post("http://localhost:3001/login",{email,password})
      .then(result =>{
        console.log(result.data)
        if(result.data.message==="login success"){
          const name = result.data.nam;
          navv("/todoapp",{state:{name}})
        }
        else if(result.data.message==="Wrong Password"){
          const name = result.data.nam;
          alert("Incorrect password "+name)
          location.reload()
        }
        else{
          alert("No Record Found")
          location.reload()
        }
      })   
      .catch(err => console.log(err))
    }

  return (
    <>
      <div className="Lgg">


        <div className="im">
           
        </div>


        <div className="fm">
            <h1 class="animate__animated animate__bounceInRight">Welcome , Login to Expreience the TODO Maker for your Daily Task's</h1>
            <box-icon type='solid' name='user-badge'></box-icon>
            <input type="text" placeholder="Enter your email" className="inputt" onChange={(e)=>setem(e.target.value)} />
            <br />
            <box-icon type='solid' name='face-mask'></box-icon>
            <input type={showPassword ? 'text' : 'password'} value={password}  placeholder="Enter your password" className="inputt" onChange={(e)=>setps(e.target.value)} />
            <button onClick={() => setShowPassword(!showPassword)} className="MK">{showPassword ? <box-icon name='low-vision'></box-icon> : <box-icon name='glasses-alt'></box-icon>}</button>
            <br />
            <br />
            <button type="button" className="butt" onClick={handlelog}>Login</button>
<br />
            <Link to={"/reg"} className="KK"> <span> New User click here</span></Link>

        </div>


      </div>
    </>
  )
}

export default lf
