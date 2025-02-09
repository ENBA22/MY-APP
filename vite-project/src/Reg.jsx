import React from "react";
import { useState } from "react";
import axios from 'axios'
import './Reg.css'
import Image from './assets/imm.png'
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Reg() {
    const [name, setnm] = useState()
    const [email, setem] = useState()
    const [password, setps] = useState()
    const navv=useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    const handlesub =(e)=>{
      e.preventDefault()
      axios.post("http://localhost:3001/reg",{name,email,password})
      .then(result =>{
        if(result.data.message==="Password must be at least 8 characters and have both uppercase & lowercase letters"){
          alert("Weak Password !! check itt")
        }
        else{
          navv("/lf")
        }
      })
      .catch(err => console.log(err))
    }
    return (
      <>
      <div  className="Rgg">
      
                <div className="img">
                         
                </div>
             
                <div className="Re">
               
                <p class="cursor typewriter-animation">WeLCOMe TO TODO APP! ReGISTeR HeRe !</p>
                <h3>REGISTRATION FORM</h3>
                    <input type="text" name="name" placeholder="Enter Your Name " className="input"  onChange={(e)=> setnm(e.target.value)}/> <br />
                    <input type="email" name="email" placeholder="Enter Your Email" className="input" onChange={(e)=> setem(e.target.value)}/><br />
                    <input type={showPassword ? 'text' : 'password'} value={password} name="password" placeholder="Enter Your Password" className="input" onChange={(e)=> setps(e.target.value)}/>
                    <button onClick={() => setShowPassword(!showPassword)} className="MK">{showPassword ? <box-icon name='low-vision'></box-icon> : <box-icon name='glasses-alt'></box-icon>}</button>
                     <br />
                    <input type="password" name="cpassword" placeholder="Confirm Your Password" className="input"/><br />
                    <button type="button" className="but" onClick={handlesub}>Register</button> <br /> <br />
                    
                    <Link to={"/lf"} className="ee">Back</Link>
                </div>
      </div>
      </>
    )
  }
  
  export default Reg