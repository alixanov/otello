import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Link } from 'react-router-dom';
import "./hotels-list.css";
import ContentLoader from "react-content-loader"; // Импортируем ContentLoader

const HotelsList = () => {
     const { id } = useParams();
     const [hotels, setHotels] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);

     useEffect(() => {
          axios
               .get("https://otello-server.vercel.app/api/getall")
               .then((response) => {
                    setHotels(response.data);
                    setLoading(false);
               })
               .catch((error) => {
                    console.error("Ошибка при загрузке данных:", error);
                    setError("Не удалось загрузить данные. Попробуйте позже.");
                    setLoading(false);
               });
     }, []);

     if (error) return <div className="error-message">{error}</div>;

     const filteredHotels = id ? hotels.filter(hotel => hotel.star == id) : hotels;

     const groupedHotels = filteredHotels.reduce((acc, hotel) => {
          const star = hotel.star;
          if (!acc[star]) {
               acc[star] = [];
          }
          acc[star].push(hotel);
          return acc;
     }, {});

     const sortedStars = Object.keys(groupedHotels).sort((a, b) => b - a);

     return (
          <div className="hotels__big__container">
               <div className="hotels__container">
                    {loading ? (
                         // Скелетон загрузки
                         <div className="hotels__cards">
                              {[...Array(6)].map((_, index) => (
                                   <div key={index} className="hotels__card">
                                        <ContentLoader
                                             speed={2}
                                             width={300}
                                             height={400}
                                             viewBox="0 0 300 400"
                                             backgroundColor="#f3f3f3"
                                             foregroundColor="#ecebeb"
                                        >
                                             <rect x="0" y="0" rx="12" ry="12" width="100%" height="200" /> {/* Изображение */}
                                             <rect x="0" y="220" rx="6" ry="6" width="80%" height="20" /> {/* Заголовок */}
                                             <rect x="0" y="250" rx="6" ry="6" width="60%" height="15" /> {/* Описание */}
                                             <rect x="0" y="280" rx="6" ry="6" width="50%" height="15" /> {/* Локация */}
                                             <rect x="0" y="310" rx="6" ry="6" width="40%" height="15" /> {/* Даты */}
                                             <rect x="0" y="340" rx="6" ry="6" width="30%" height="15" /> {/* Цена */}
                                        </ContentLoader>
                                   </div>
                              ))}
                         </div>
                    ) : (
                         sortedStars.map((star) => (
                              <div key={star} className="hotels__category">
                                   <div className="hotels__star__title">
                                        <h2>Отели с {star} звездами</h2>
                                        <p>Лучшие предложения по отелям</p>
                                   </div>

                                   <div className="hotels__cards__wrapper" key={id || "all"}>
                                        <div className="hotels__cards">
                                             {groupedHotels[star].map((hotel) => (
                                                  <Link to={`/hotel/${hotel._id}`} key={hotel._id} className="hotels__card">
                                                       <div className="hotels__card__img">
                                                            <img
                                                                 src={hotel.rasm?.[0] || "/placeholder.jpg"}
                                                                 alt={hotel.nomi}
                                                                 className="hotels__image"
                                                                 loading="lazy"
                                                            />
                                                       </div>

                                                       {hotel.discount > 0 && (
                                                            <div className="hotels__discount">
                                                                 <AutoAwesomeIcon sx={{ color: "#58CC16" }} />
                                                                 <button>{hotel.discount}%</button>
                                                            </div>
                                                       )}

                                                       <div className="hotels__info">
                                                            <p className="hotels__rating">{"⭐".repeat(hotel.star)} {hotel.rating}</p>
                                                            <h3 className="hotels__name">{hotel.nomi}</h3>
                                                            <p className="hotels__location">{hotel.manzil}</p>
                                                            <p className="hotels__dates">Даты: {hotel.dates} взрослых</p>
                                                            <p className="hotels__price">{hotel.narxi} $ / ночь</p>
                                                       </div>

                                                       <div className="hotels__favorites__icon">
                                                            <FavoriteBorderIcon />
                                                       </div>
                                                  </Link>
                                             ))}
                                        </div>
                                   </div>
                              </div>
                         ))
                    )}
               </div>
          </div>
     );
};

export default HotelsList;