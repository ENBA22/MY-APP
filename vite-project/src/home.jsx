import React  , {useEffect, useState } from 'react'
import Create from './crreate'
import './home.css'
import axios from 'axios'
import "animate.css"
import 'boxicons'
import { useLocation } from "react-router-dom";
import { Link } from 'react-router-dom'

function home () {
    const [todos,setTodos] = useState([])
    const loc=useLocation()
    const username=loc.state?.name
    console.log(username)
    useEffect(() => {
      axios
        .get("https://app-back-gamma.vercel.app/get/"+username) // Include username in the request
        .then((result) => setTodos(result.data))
        .catch((err) => console.log(err));
    }, [username]);

    const handleedit = (id, username) => { 
      axios.put(`https://app-back-gamma.vercel.app/update/${id}`, { username: username }) 
      .then(result => {
          location.reload();
      })
      .catch(err => console.log(err));
    };

    const handletodo = (id, username) => { 
      axios.put(`https://app-back-gamma.vercel.app/todoo/${id}`, { username: username }) 
      .then(result => {
          location.reload();
      })
      .catch(err => console.log(err));
  };
  
    const handledone =(id, username)=>{
      axios.put(`https://app-back-gamma.vercel.app/done/${id}`, { username: username })
      .then(result => {
        location.reload()
      })
      .catch(err => console.log(err))
    }

    const handledel =(id, username)=>{
      axios.put(`https://app-back-gamma.vercel.app/del/${id}`, { username: username })
      .then(result => {
        location.reload()
      })
      .catch(err => console.log(err))
    }

  return (
    <div className='Enba'>
      <h2 className='LP' class=" animate__animated animate__backInUp">Welcome back {username} Soldier!!</h2> 
      <h2 className='h11' class="animate__animated animate__slideInDown">TODO List</h2>
      <Create user={username}/>
      {
        todos.length === 0
        ?
        <h2>NO RECORDS FOUND</h2>
        :
        <div className='task'>
          <div className='TODOO'>
          <center><h4 className='LL'>TODO KARO</h4></center>
            <hr />
          {todos.map(todo => (
            todo.done==="no" && todo.tag==="MOST IMPORTANT"
            ?
            <div className='TODO'>
            <p className='TG'>{todo.tag} </p>
            <p >{todo.task}</p>
            <button className='But' onClick={ () => handleedit(todo._id,username)}><box-icon type='solid' name='edit'></box-icon></button>
            <button className='But' onClick={ () => handledel(todo._id,username)}><box-icon name='task-x' ></box-icon></button>
            <button className='But' onClick={ () => handledone(todo._id,username)}><box-icon name='run'></box-icon></button>          
          </div>
          : null
          ))}
          {todos.map(todo => (
            todo.done==="no" && todo.tag==="IMPORTANT"
            ?
            <div className='TODO'>
            <p className='TG'>{todo.tag}</p>
            <p >{todo.task}</p>
            <button className='But' onClick={ () => handleedit(todo._id,username)}><box-icon type='solid' name='edit'></box-icon></button>
            <button className='But' onClick={ () => handledel(todo._id,username)}><box-icon name='task-x' ></box-icon></button>
            <button className='But' onClick={ () => handledone(todo._id,username)}><box-icon name='run'></box-icon></button>            
          </div>
          : null
          ))}
          {todos.map(todo => (
            todo.done==="no" && todo.tag==="USUAL"
            ?
            <div className='TODO'>
            <p className='TG'>{todo.tag}</p>
            <p >{todo.task}</p>
            <button className='But' onClick={ () => handleedit(todo._id,username)}><box-icon type='solid' name='edit'></box-icon></button>
            <button className='But' onClick={ () => handledel(todo._id,username)}><box-icon name='task-x' ></box-icon></button>
            <button className='But' onClick={ () => handledone(todo._id,username)}><box-icon name='run'></box-icon></button>        
          </div>
          : null
          ))}
          </div>

          <div className='DONEE'>
            <center><h4 className='LL'>DOING</h4></center>
            <hr />
          {todos.map(todo => (
            todo.done==="yes" 
            ?
            <div className='DONE'>
            <p>{todo.task}</p>
            <button className='But' onClick={ () => handletodo(todo._id,username)}><box-icon name='add-to-queue' type='solid' ></box-icon></button>
            <button className='But' onClick={ () => handledel(todo._id,username)}><box-icon name='task-x' ></box-icon></button>
            <button className='But' onClick={ () => handledone(todo._id,username)}><box-icon name='run'></box-icon></button>   
          </div>
          :
          null
          ))}
          </div>


          <div className='DELETEE'>
            <center><h4>DONE OH DONE !!!</h4></center>
            <hr />
            {todos.map(todo => (
            todo.done==="dusted" 
            ?
            <div className='DELE'>
            <strike><p>{todo.task}</p></strike>
            <button className='But' onClick={ () => handletodo(todo._id,username)}><box-icon name='add-to-queue' type='solid' ></box-icon></button>
            <button className='But' onClick={ () => handledel(todo._id,username)}><box-icon name='task-x' ></box-icon></button>  

          </div>
          :
          null
          ))}
            
          </div>



        </div>     
      }
      </div>
  )
}

export default home
