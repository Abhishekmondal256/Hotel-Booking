import React from 'react';
import {Link} from "react-router-dom";
import "../Landing/Landing.css";
const Landing = () => {
  return (
    <div className='row landing justify-content-center'>
    <div className='col-md-9 my-auto text-center'>
     <h2 >BookMyRooms</h2>
     <h1 style={{color:'white'}}>"There is Only one boss." The Guest</h1>
     <Link to="/home">
        <button className='btn landingbtn' >Get Started</button>
     </Link>
    </div>
    
    </div>
  )
}

export default Landing