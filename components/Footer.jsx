import { Contact } from 'lucide-react'
import React from 'react'

function Footer() {
  return (
    <div className='footer'>
       <div className='footerFirstCol'>
        <h1>About us</h1>
        <h4>Our Idea</h4>
        <h4>Our Team</h4>
       </div>
       <div className='footerSecondCol'>
        <h1>Features</h1>
        <h4>mindmap</h4>
        <h4>flash cards</h4>
        <h4>summary</h4>
        <h4>learning techniques</h4>
        <h4>Q & A</h4>
      </div>
      <div>
      <h1>Contact Us</h1>
        <h4>Email</h4>
        <h4>Instagram</h4>
        <h4>Twitter</h4>
        <h4>Youtube</h4>
      </div>
    </div>
  )
}

export default Footer