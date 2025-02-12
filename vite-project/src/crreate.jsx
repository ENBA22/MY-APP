import React, {useState} from 'react'
import './Ct.css'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Create ({user}) {
  const [task,setTask]=useState()
  const [tag,setTag] = useState()
  
  const handleAdd = () => {
    axios.post('https://app-back-phi.vercel.app/add',{task : task ,tag : tag,name:user})
    .then(result =>{
      location.reload()
    })
    .catch(err => console.log(err))
  }
  return (
    <div className='Enb'>
        <input type="text" className='En' placeholder='Enter task' onChange={(e) => setTask(e.target.value) } />
        <select name="select" id=""  onChange={(e) => setTag(e.target.value) } >
          <option value="NEW" className='op' >select</option>
          <option value="MOST IMPORTANT" className='op'>MOST IMPORTANT</option>
          <option value="IMPORTANT" className='op'>IMPORTANT</option>
          <option value="USUAL" className='op'>USUAL</option>
        </select>
        <button type='button'  className='btn' onClick={handleAdd}>ADD</button>
        <p className='REF'><box-icon name='add-to-queue' type='solid' ></box-icon>TODO<box-icon type='solid' name='edit'></box-icon> DOING<box-icon name='run'></box-icon>DONE<box-icon name='task-x' ></box-icon>DELETE</p>
        <Link to={"/lf"} className='Lk'>LOGOUT</Link>
    </div>
    
  )
}

export default Create
