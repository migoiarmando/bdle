import React from 'react'
import "../styles/notFound.css";
import notFoundImg from '../assets/not-found.svg'

const NotFound: React.FC = () => {
  return (
    <div className="content">
        <img src={notFoundImg} alt="" />
        <h3>Page not found</h3>
        <span className='notfound-content'>We're working hard to get it ready for you. Stay tuned for updates!</span>
    </div>
  )
}

export default NotFound