import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BsSend } from 'react-icons/bs'
import { BsFacebook } from 'react-icons/bs'
import { BsInstagram } from 'react-icons/bs'
import { BsGithub } from 'react-icons/bs'

const Footer = () => {
  const navigate = useNavigate()
  
  return (
    <>
    <div id='footer'>
      <div className='subscribe-box'>
        <p>Subscribe to The Newspaper’s digital newsletter for your daily digest of essential news, views and analysis delivered directly to your inbox.</p>
        <span><BsSend className='send-icon'/> Newsletter sign-up</span>
      </div>
      <div className='information-box'>
        <p>Information</p>
        <ul>
          <li onClick={() => {navigate('/about/')}}>About</li>
          <li>Contact</li>
          <li>Source</li>
          <li>Data protection</li>
          <li>Privacy policy</li>
          <li>Terms and conditions</li>
        </ul>
      </div>
      <div className='social-box'>
        <p>Follow me</p>
        <ul>
          <li><BsFacebook className='social-icon'/> Facebook</li>
          <li><BsInstagram className='social-icon'/> Instagram</li>
          <li><BsGithub className='social-icon'/> Gitbub</li>
        </ul>
      </div>
    </div>
    <p id='copy-right'>© The Newspapaer</p>
    </>
  )
}

export default Footer
