# :newspaper: The Newspaper

### A news app, using a data from [NewsAPI.org](https://newsapi.org/) and [WeatherApi.com](https://www.weatherapi.com/)

#

> ### :eyes: Mockup of the Project

- The news content will take up enough space at the center. News content can be navigated using a hand or a mouse cursor, and pagination allows you to know how many news articles are available.
- When you select each section, the category changes, and the selected category is displayed with a different label color depending on the category
- Like other news apps, weather information is also displayed. To ensure better readability, only limited information for the 3-day forecast is shown.
  ![hifi-wireframe](/../main/src/img/mockup-image.png)
  ![mockup-image](../main/src/img/mockup.jpg)
> ### :dancers: Dependencies

- **React** `import React from 'react'`
  - Create and manage components
- **ReactDOM** `import ReactDOM from 'react-dom/client'`
  - Interact with DOM
- **React-router-dom** `import { useNavigate } from 'react-router-dom'`
  - Navigate between different pages or components
- **React-loader-spinner** `import { Bars } from 'react-loader-spinner'`
  - Showing spinner while 'loading' is true
- **React-icons** `import { BsSearch } from 'react-icons/bs'`
  - Font awesome icons
- **Swiper** `import { Swiper, SwiperSlide } from 'swiper/react'`
  - Touch-enabled slider

  
>### :keyboard: Code snippets
1. useEffect will render initially based on the default location
```javascript
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
```

2. fetchWeather will render when clicking the find icon
```javascript
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
```

3. Get day of week using Date and getDay function
```javascript
const getDayOfWeek = (dateString) => {
        const dayOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
        const date = new Date(dateString)
        const dayOfWeekIndex = date.getDay()
        return dayOfWeek[dayOfWeekIndex]
    }

```

4. Change date formats like '7 Aug'
```javascript
 const formatDate = (dateString) => {
        const date = new Date(dateString)
        const day = date.getDate()
        const monthIndex = date.getMonth()
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        const month = monthNames[monthIndex]
        return `${day} ${month}`
    }
```

5. Swiper package
  - install swiper ```npm install swiper```
  - import swiper, style and modules
```javascript
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper/modules'
```
  - wraps with Swiper and SwiperSlide at desired point
```javascript
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
          //...some more code here
          </div>
        </SwiperSlide>
      )))
    }
</Swiper>
```

> ### :hammer_and_wrench: Project Tools Used

1. VS Code
   - Writing and managing code.
2. Terminal
   - installing dependencies, starting the development server, running test
3. Node.js and npm
   - Node.js is a runtime environment that allows JavaScript code to run outside the browser
   - npm is used to manage project dependencies and packages.
4. Git
   - remote repository hosting
   - .gitignore file allows Git should ignore when I commit changes
5. Chrome dev tools
   - inspect and modify the DOM, debug JavaScript code

> ### :weight_lifting_woman: Who developed?
>
> ![aboutme](/../main/src/img/about-alice.svg)

- I am a student at Yoobee, currently taking a course in Web and UX design. Recently, I've been learning React, and I'm excited to develop more cool apps in the future!
