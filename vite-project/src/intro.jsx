import React from 'react'
import "./intro.css"
import { Link } from 'react-router-dom'
function intro (){

  return (
<div class="shadow-dance-container">
    <Link to={"/lf"}><h1 class="shadow-dance-text">WeLCOMe TO eNBA's  <br /> TODO MAKeR!!</h1></Link>
</div>

  )
}

export default intro
