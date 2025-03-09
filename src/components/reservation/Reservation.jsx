import React, { useState } from 'react';
import WorkSharpIcon from '@mui/icons-material/WorkSharp';
import DialpadSharpIcon from '@mui/icons-material/DialpadSharp';
import TaskAltSharpIcon from '@mui/icons-material/TaskAltSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import "./reservation.css"; // Ensure the path to the file is correct
import { Link } from "react-router-dom";

const Reservation = () => {
     const [isModalOpen, setIsModalOpen] = useState(false);

     const openModal = () => {
          setIsModalOpen(true); // Show modal
     };

     const closeModal = () => {
          setIsModalOpen(false); // Hide modal
     };

     return (
          <div className='reservation__container'>
               <WorkSharpIcon className="reservation__icon" />
               <h2 className="reservation__title">Пока здесь ничего нет</h2>
               <p className="reservation__text">Войдите в профиль, чтобы видеть историю своих бронирований</p>
               <Link className="reservation__button" onClick={openModal}>Войти</Link>

               {/* Custom Modal */}
               {isModalOpen && (
                    <div className="cabinet-modal-overlay">
                         <div className="cabinet-modal">
                              <button className="cabinet-close" onClick={closeModal}>
                                   <CloseSharpIcon />
                              </button>
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
                         </div>
                    </div>
               )}
          </div>
     );
}

export default Reservation;
