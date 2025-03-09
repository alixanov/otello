import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ContentLoader from 'react-content-loader';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import TaskAltSharpIcon from "@mui/icons-material/TaskAltSharp";
import DialpadSharpIcon from '@mui/icons-material/DialpadSharp';
import './most-liked.css'; // Подключаем стили

const MostLiked = () => {
     const [mostLikedHotels, setMostLikedHotels] = useState([]);
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState(null);
     const [isModalOpen,setIsModalOpen] = useState(false)

     useEffect(() => {
          const mostLikedHotelIds = JSON.parse(localStorage.getItem('favoriteHotels')) || [];

          axios.get('https://otello-server.vercel.app/api/getall')
               .then(response => {
                    const filteredHotels = response.data.filter(hotel => mostLikedHotelIds.includes(hotel._id));
                    setMostLikedHotels(filteredHotels);
                    setLoading(false);
               })
               .catch(error => {
                    console.error('Ошибка при загрузке данных отелей:', error);
                    setError('Ошибка при загрузке данных');
                    setLoading(false);
               });
     }, []);

     const openModal = () => {
          setIsModalOpen(true)
     }
     const closeModal = () => {
          setIsModalOpen(false)
     }

     if (error) return <div>{error}</div>;

     const groupedHotels = mostLikedHotels.reduce((acc, hotel) => {
          const city = hotel.manzil || 'Неизвестно';
          if (!acc[city]) {
               acc[city] = [];
          }
          acc[city].push(hotel);
          return acc;
     }, {});

     return (
          <div className='most-liked__container'>
               <h1>Избранное</h1>

               <div className="most-liked__cards">
                    {loading ? (
                         // Скелетон для заголовка
                         <div className="most-liked__header">
                              <ContentLoader
                                   speed={2}
                                   width={330}
                                   height={101}
                                   viewBox="0 0 440 101"
                                   backgroundColor="#f3f3f3"
                                   foregroundColor="#ecebeb"
                              >
                                   <rect x="0" y="0" rx="12" ry="12" width="440" height="101" />
                              </ContentLoader>
                         </div>
                    ) : (
                         <div className="most-liked__header">
                              <span className="most-liked__all">Все</span>
                              <span className="most-liked__count">{mostLikedHotels.length} hotels</span>
                         </div>
                    )}

                    {loading ? (
                         // Скелетоны для загрузки отелей
                         Array.from({ length: 3 }).map((_, index) => (
                              <div key={index} className="most-liked__city">
                                   <div className="most-liked__city__title">
                                        <ContentLoader
                                             speed={2}
                                             width={330}
                                             height={101}
                                             viewBox="0 0 440 101"
                                             backgroundColor="#f3f3f3"
                                             foregroundColor="#ecebeb"
                                        >
                                             <rect x="0" y="0" rx="12" ry="12" width="440" height="101" />
                                        </ContentLoader>
                                   </div>
                              </div>
                         ))
                    ) : (
                         Object.entries(groupedHotels).map(([city, hotels]) => (
                              <div key={city} className="most-liked__city">
                                   <div className="most-liked__city__title">
                                        <h2>{city}</h2>
                                        <span className="most-liked__city__count">{hotels.length} отель</span>
                                   </div>
                                   <div className="most-liked__hotels">
                                        {hotels.map(hotel => (
                                             <Link to={`/hotel/${hotel._id}`} key={hotel._id} className="Most-liked__hotel">
                                                  <img
                                                       src={hotel.rasm && hotel.rasm.length > 0 ? hotel.rasm[0] : '/default-hotel.jpg'}
                                                       alt={hotel.nomi}
                                                       className="most-liked-hotel-image"
                                                       onError={(e) => { e.target.src = '/default-hotel.jpg'; }} // Если картинка не загрузится
                                                  />
                                             </Link>
                                        ))}
                                   </div>
                              </div>
                         ))
                    )}
               </div>

               {loading ? 
                    <div className='most-liked__login__prompt'  >
                         <ContentLoader
                              speed={2}
                              width={330}
                              height={101}
                              viewBox="0 0 440 101"
                              backgroundColor="#f3f3f3"
                              foregroundColor="#ecebeb"
                         >
                              <rect x="0" y="0" rx="12" ry="12" width="440" height="101" />
                         </ContentLoader>

                    </div>
              
                    : (
                         <div className="most-liked__login__prompt">
                              <p>Войдите в профиль, чтобы иметь доступ к избранному с любого устройства</p>
                              <button className="most-liked__login__button" onClick={openModal}>Войти</button>
                         </div>
                    )
               }

               {/* Кастомное модальное окно */}
               {isModalOpen && (
                    <div className="cabinet-modal-overlay">
                         <div className="cabinet-modal">
                              <h2>Вход в профиль</h2>
                              <div className="cabinet-modal-content">
                                   <div className="cabinet__form__modal">
                                        <p className="modal-subtitle">
                                             По номеру телефона
                                             <DialpadSharpIcon />
                                        </p>
                                        <p className="modal-description">
                                             Введите номер телефона, чтобы войти или зарегистрироваться
                                        </p>

                                        <div className="modal-phone-input">
                                             <input type="text" placeholder="Телефон" />
                                        </div>

                                        <button className="modal-continue-button">Продолжить</button>
                                        <div className="modal-separator">
                                             <span>ИЛИ</span>
                                        </div>
                                        <button className="modal-sber-id-button">
                                             <TaskAltSharpIcon sx={{ color: "#4d9e46" }} />
                                             Войти по Сбер ID
                                        </button>
                                        <div className="modal-sber-card">
                                             <p className="modal-sber-id-description">
                                                  Войдите по Сбер ID, списывайте и получайте бонусы при оплате любой картой
                                             </p>
                                        </div>
                                        <Link className="modal-other-ways-button"
                                             to={"/register"}
                                        >
                                             Войти другим способом
                                        </Link>
                                        <p className="modal-footer">
                                             Нажимая любую кнопку, вы принимаете условия Лицензионного соглашения и правила Программы лояльности. Условия и цели обработки персональных данных определены в Политике конфиденциальности.
                                        </p>
                                   </div>
                              </div>
                              <button className="cabinet-close" onClick={closeModal}>
                                   <CloseSharpIcon />
                              </button>
                         </div>
                    </div>
               )}

               
          </div>
     );
};

export default MostLiked;