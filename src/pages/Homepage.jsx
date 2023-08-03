import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { Bars } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom'
import { NewsContext } from '../context/NewsContext'
//Font awesome
import { BsSearch } from 'react-icons/bs'
import { BiCurrentLocation } from 'react-icons/bi'
import { TbMapPinSearch } from 'react-icons/tb'
import { BsFillSunriseFill } from 'react-icons/bs'
import { BsFillSunsetFill } from 'react-icons/bs'
import { BsShare } from 'react-icons/bs'
import { BsDot } from 'react-icons/bs'
//Swiper
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'

//Api Key
const newsApiKey = import.meta.env.VITE_NEWS_API_KEY
const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY

//Set color by category
const categoryColor ={
    business: '#0072AC',
    entertainment: '#D95840',
    general: '#58466D',
    health: '#D57792',
    science: '#03978A',
    sports: '#954849',
    technology: '#6D8B63'
}


const Homepage = () => {

    // NEWS
    // set up the news context
    const { setSelectedNews } = useContext(NewsContext)
    // useState for inputs
    const [searchTerm, setSearchTerm] = useState('')
    const [category, setCategory] = useState('general')
    // state for news
    const [news, setNews] = useState([])
    // state for loading
    const [loading, setLoading] = useState(true)
    // define useNavigate
    const navigate = useNavigate()

    // WEATHER
    //State declaration for the weather
    const [weather, setWeather] = useState(null)
    //State declaration for location
    const [location, setLocation] = useState('Auckland') 
    //State for weather loading
    const [weatherLoading, setWeatherLoading] = useState(true)
 
    // useEffect for NEWS
    useEffect(() => {
        const fetchNews = async() => {
            setLoading(true)
            try {
                const response= await axios.get(
                    `https://newsapi.org/v2/top-headlines?country=us&language=en&category=${category}&q=${searchTerm}&apiKey=${newsApiKey}`
                )
                const newsArticles = response.data.articles.map((article) => {
                    return {
                        //spread operator ...
                        ...article,
                        onSelect: () => setSelectedNews(article)
                    }
                })
                console.log(response.data.articles);
                setNews(newsArticles)
                setLoading(false)
            } catch (error) {
                console.log(error);
            }
        }
        fetchNews()
    }, [category, searchTerm, newsApiKey])

    //Fetch weather
    const fetchWeather = async () => {  
        setWeatherLoading(true)
        try {
            const response = await axios.get(
                `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${location}&days=4`
            )
            console.log(response.data);
            setWeather(response.data)
            } catch (error){
                console.log(error);    
            }
            setWeatherLoading(false)
    }

    //useEffect fetch data based on the default location
    useEffect(() => { fetchWeather() },[]) 


    //Get day of week which can take datestring from json data
    const getDayOfWeek = (dateString) => {
        const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const date = new Date(dateString)
        const dayOfWeekIndex = date.getDay()
        return dayOfWeek[dayOfWeekIndex]
    }

    //Change date formats
    const formatDate = (dateString) => {
        const date = new Date(dateString)
        const day = date.getDate()
        const monthIndex = date.getMonth()
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const month = monthNames[monthIndex]
        return `${day} ${month}`
    }    

  return (
    <div id='homepage'>
        <div className='grid-nav-and-search'>
            <div id='nav-section'>
                <ul>
                    <li onClick={() => {
                        navigate('/')
                    }}>HOME</li>
                    <li onClick={() => {
                        navigate('/about/')
                    }}>ABOUT</li>
                    <li>CONTACT</li>
                </ul>
            </div>
            <div id='search-bar'>
                <label htmlFor='search'><BsSearch/></label>
                <input 
                    type='text'
                    name='search'
                    id='search'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder='SEARCH HERE...'
                />
            </div>
        </div>
        <div className='grid-news-and-weather'>
            <div id='category-box'>
                <ul>
                    <li 
                        onClick={() => setCategory('business')}>
                        BUSINESS
                    </li>
                    <li onClick={() => setCategory('entertainment')}>
                        ENTERTAINMENT
                    </li>
                    <li onClick={() => setCategory('general')}>
                        GENERAL
                    </li>
                    <li onClick={() => setCategory('health')}>
                        HEALTH
                    </li>
                    <li onClick={() => setCategory('science')}>
                        SCIENCE
                    </li>
                    <li onClick={() => setCategory('sports')}>
                        SPORTS
                    </li>
                    <li onClick={() => setCategory('technology')}>
                        TECHNOLOGY
                    </li>
                </ul>
                <BsDot className='dot-top-right'/>
                <BsDot className='dot-bottom-right'/>
            </div>
            <div id='news-box'>
                <Swiper pagination={true} modules={[Pagination]}  id='swiper' className="mySwiper">
                    {loading ? (
                        <Bars color='#954849' height={100} width={100}/>
                        ) : news.length === 0 ? (<p>No Articles Found</p>) : 
                            (news.map((item) => (
                                <SwiperSlide key={item.url}>
                                    <div 
                                        id='news'
                                        onClick={() => {
                                        item.onSelect()
                                        navigate('article')
                                        }}
                                    >
                                        <div 
                                            id='tag-category'
                                            style={{backgroundColor: categoryColor[category]
                                            }}
                                        >
                                            {category}
                                        </div>
                                        <div    id='news-contents-wrapper'>
                                            <h2 id='title'>{item.title}</h2>
                                            <p id='description'>{item.description}</p>
                                            <div className='flex-line'>
                                                <div id='share'>
                                                    <BsShare/>  <span>Share</span>
                                                </div>
                                                <p id='author'>Author : <span>{item.author}</span></p>
                                            </div>
                                        </div>
                                        <div className='image-container'>
                                            <img className='image' src={item.urlToImage} alt={item.title}/>
                                        </div>   
                                    </div>
                                </SwiperSlide>
                            )))
                    
                    }
                </Swiper>
            </div>
            <div id='weather-box'>
                <BsDot className='dot-top-left'/>
                <BsDot className='dot-bottom-left'/>
                <div className='location-control-box'>
                    <div className='location-container'>
                        < BiCurrentLocation />
                        <input 
                            type='text'
                            value={location}
                            onChange={(e) => {
                                setLocation(e.target.value)
                            }}
                        />
                    </div>
                <TbMapPinSearch 
                    className='find-icon' 
                    onClick={() => fetchWeather()}
                />
            </div>
            {weatherLoading ? (    
                <Bars color='#954849' height={100} width={100} />
            ) : (
            weather && (
                <>
                    <div className='current-day'>
                        <div className='flex-line'>
                            <h2 className='text-today'>Today</h2>
                            <p className='day-today'>{getDayOfWeek(weather.forecast.forecastday[0].date)},<span>
                            {formatDate(weather.forecast.forecastday[0].date)}</span></p>
                        </div>
                        <div className='flex-line'>
                            <img className='today-weather-icon' src= {weather.current.condition.icon} alt='weather-icon'/>
                            <div>
                                <h1 className='current-temp'>{weather.current.temp_c}°</h1>
                                <p className='feel-temp'>Feels like {weather.current.feelslike_c}°</p>
                            </div>
                        </div>
                        <div className='current-weather-contion'>
                            {weather.current.condition.text}
                        </div>
                        <div className='today-max-min-temp'>
                            <p><span>{weather.forecast.forecastday[0].day.maxtemp_c}°C </span>/<span>{weather.forecast.forecastday[0].day.mintemp_c}°C</span></p>
                        </div>
                        <div id='sunset-sunrise' className='flex-line'>
                            <div className='flex-line'>
                                <BsFillSunriseFill/>
                                <p>{weather.forecast.forecastday[0].astro.sunrise}</p>
                            </div>
                            <div className='flex-line'>
                                <BsFillSunsetFill/><p>{weather.forecast.forecastday[0].astro.sunset}</p>
                            </div>  
                        </div>
                    </div>
                
                    <div className='forecast-day' >
                        {weather.forecast.forecastday.slice(1).map((day, index) => (
                            <div key={index} className='day-container'>
                                <h4>
                                    <span>
                                        {getDayOfWeek(day.date)}
                                    </span>
                                    {formatDate(day.date)}
                                </h4>
                                <div className='day-contents'>
                                    <p className='day-condition'>   {day.day.condition.text}</p>
                                    <p className='day-min-max'>
                                    {day.day.maxtemp_c}°C / {day.day.mintemp_c}°C
                                    </p>
                                </div>
                                <img src= {day.day.condition.icon} alt='weather-icon'/>
                            </div> 
                        ))}
                    </div>
                </>
            ) 
        )}
                 
            </div>
        </div>
      
    </div>
  )
}

export default Homepage
