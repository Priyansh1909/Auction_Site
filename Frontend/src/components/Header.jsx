import React from 'react'
import "../css/footer.css"
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <>
    <div className='Footer_Container'>
        <Link to="/" style={{textDecoration:'none'}}>
            <div className='link'>
                Home
            </div>
        </Link>
        <Link to="/profile" style={{textDecoration:'none'}}>
            <div className='link'>
                Profile
            </div>
        </Link>
    </div>
    </>
  )
}

export default Footer