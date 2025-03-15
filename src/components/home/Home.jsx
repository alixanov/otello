import React from 'react'
import { Product, SearchPage, Swiper, WillTouch ,Footer} from '../'
import "./home.css"

const Home = () => {
  return (
    <div className='home__container'>
           
      <div className="home__card">
     
      <Product />
      <SearchPage />
      </div>
      <div className="home__csearch__card">
        <SearchPage />
        <Product />
      </div>
      <Swiper />
      <WillTouch />
      <Footer/>
           
    </div>
  )
}

export default Home
