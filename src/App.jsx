import { HashRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { NewsContextProvider } from './context/NewsContext'

//import of pages
import Homepage from './pages/Homepage'
import About from './pages/About'
//import of components
import Header from './components/Header'
import Footer from './components/Footer'
import SingleNews from './components/SingleNews'

function App() {

  return (
    <HashRouter>
      <NewsContextProvider>
      <Header/>
      <Routes>
        <Route exact path='/' element={<Homepage/>}/>
        <Route path='/about/' element={<About/>}/>
        <Route path='article' element={<SingleNews/>}/>
      </Routes>
      <Footer/>
      </NewsContextProvider>
    </HashRouter>
  )
}

export default App
