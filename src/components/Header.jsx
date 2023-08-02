import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BsDot } from 'react-icons/bs'

const Header = () => {
  const navigate = useNavigate()
  return (
    <div id='header'>
     
      <div className='header-text'>
        <h1 onClick = {() => {navigate('/')}}>
          THE NEWSPAPER
        </h1>
      </div>
      <div className='header-design'>
        <BsDot className='dot-header-top'/>
        <div className='diagonal-line'></div>
        <BsDot className='dot-header-bottom'/>
      </div>
      
    </div>
  )
}

export default Header
