import React from 'react'
import { useNavigate } from 'react-router-dom'
import { BiArrowBack } from 'react-icons/bi'
import aboutImage from '../img/about-img.png'

const About = () => {
  const navigate = useNavigate()

  return (
    <div id='about'>
      <div className='about-project'>
        <h3>About this project</h3>
        <p>This News app shows the top headline <span className='green'>news</span> with a <span className='pink'>category filter</span> and <span className='blue'>search function</span> for easy navigation. The homepage displays <span className='green'>weather </span>information from WeatherAPI.com, including a 3-day forecast. Users can choose their preferred base city</p>
      </div>
      <div className='about-me'>
        <h3>About ME</h3>
        <div className='about-img-and-facts'>
          <img src={aboutImage} alt='aboutme'/>
          <div className='fact-lists'>
            <h4>Some facts about Alice</h4>
            <ul>
              <li>Originally from Korea</li>
              <li>Love coding and design</li>
              <li>A humor enthusiast</li>
              <li>A cat lover but haven’t petted</li>
              <li>Active personality</li>
              <li>Coffee and croissant lover</li>
            </ul>
          </div>
        </div> 
        <p>
        As a coder, I love challenges and fun problem-solving.
        Everyday I do meditation, journaling, and 20 minutes of stretching to take care of myself. But in fact, my ultimate happy moment is enjoying a giant crispy croissant at my favorite bakery every weekend!
       </p>   
      </div>
  
      <button 
        id='back-to-home-btn'
        onClick={() => {navigate('/')}}
      >
        <BiArrowBack id='left-arrow-icon'/>Back to home
      </button>
    </div>
  )
}

export default About
