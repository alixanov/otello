import React from "react";
import { useNavigate } from "react-router-dom";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import "./hotel-swiper.css";

import img1 from "../../assets/11111.jpg";
import img2 from "../../assets/22222.jpg";
import img3 from "../../assets/333333333.jpg";

const hotels = [
     { id: 5, img: img1, title: "Пять звезд", info: "Лучшие отели" },
     { id: 4, img: img2, title: "Четыре звезды", info: "Комфорт и уют" },
     { id: 3, img: img3, title: "Три звезды", info: "Бюджетный вариант" },
];

const HotelSwiper = () => {
     const navigate = useNavigate();

     const [sliderRef, instanceRef] = useKeenSlider({
          loop: true,
          slides: { perView: 3, spacing: 20 },
          drag: true,
          mode: "free",
          created(slider) {
               slider.container.style.scrollBehavior = "auto";
          },
     });

     return (
          <div className="hotel-swiper">
               <h2 className="swiper-title">Другие подборки</h2>

               <button className="custom-swiper-button prev-button" onClick={() => instanceRef.current?.prev()}>
                    ❮
               </button>
               <button className="custom-swiper-button next-button" onClick={() => instanceRef.current?.next()}>
                    ❯
               </button>

               <div ref={sliderRef} className="keen-slider">
                    {hotels.map((hotel) => (
                         <div
                              key={hotel.id}
                              className="keen-slider__slide swiper-card"
                              onClick={() => navigate(`/star/${hotel.id}`)} // Переход на страницу с продуктами по звездам
                         >
                              <img src={hotel.img} alt={hotel.title} />
                              <div className="swiper-overlay">
                                   <p>{hotel.title}</p>
                                   <span>{hotel.info}</span>
                              </div>
                         </div>
                    ))}
               </div>
          </div>
     );
};

export default HotelSwiper;