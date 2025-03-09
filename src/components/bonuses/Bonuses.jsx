import React from "react";
import "./bonuses.css";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import CloseIcon from "@mui/icons-material/Close";
import CreditCardSharpIcon from "@mui/icons-material/CreditCardSharp";
import TaskAltSharpIcon from "@mui/icons-material/TaskAltSharp";
import RadioButtonUncheckedSharpIcon from "@mui/icons-material/RadioButtonUncheckedSharp";

const Bonuses = ({ onClose }) => {
     return (
          <div className="bonuses__container">
               <div className="bonuses__modal">
                    {/* Кнопка закрытия */}
                    <button className="bonuses__close" onClick={onClose}>
                         <CloseIcon />
                    </button>

                    {/* Заголовок */}
                    <h2 className="bonuses__title">Бонусы Спасибо</h2>

                    {/* Контейнер со скроллом */}
                    <div className="bonuses-modal-content">
                         {/* Блок с изображением и логотипом */}
                         <div className="bonuses__header">
                              <div className="bonuses__logo">
                                   <TaskAltSharpIcon sx={{ color: "#222222" }} />
                                   <span>Спасибо</span>
                              </div>
                              <p className="bonuses__subtitle">Ваша выгода со Спасибо</p>
                              <p className="bonuses__text">
                                   Копите и списывайте бонусы после входа по Сбер ID
                              </p>
                         </div>

                         {/* Список преимуществ */}
                         <ul className="bonuses__list">
                              <li>
                                   <RadioButtonUncheckedSharpIcon style={{ color: "#5CD61F", marginRight: "8px" }} />
                                   <div>
                                        <strong>Кешбэк за брони</strong>
                                        <p>5% — на первом уровне, 10% — на втором, 15% — на третьем. Максимум 3000 бонусов за бронь</p>
                                   </div>
                              </li>
                              <li>
                                   <CreditCardSharpIcon style={{ color: "#5CD61F", marginRight: "8px" }} />
                                   <div>
                                        <strong>Оплачивайте до 99% бонусами</strong>
                                        <p>1 бонус = 1 рубль</p>
                                   </div>
                              </li>
                              <li>
                                   <TaskAltSharpIcon style={{ color: "#5CD61F", marginRight: "8px" }} />
                                   <div>
                                        <strong>Выгодно с любой картой</strong>
                                        <p>Войдите по Сбер ID, чтобы получать и списывать бонусы Спасибо</p>
                                   </div>
                              </li>
                         </ul>

                         {/* Ссылка на условия */}
                         <p className="bonuses__link">
                              Подробные условия на{" "}
                              <a href="https://spasibosberbank.ru" target="_blank" rel="noopener noreferrer">
                                   spasisbosberbank.ru
                              </a>
                         </p>
                    </div>

                    {/* Кнопка входа */}
                    <button className="bonuses__button">
                         <TaskAltSharpIcon style={{ marginRight: "8px", color: "#5CD61F" }} />
                         Войти по Сбер ID
                    </button>
               </div>
          </div>

     );
};

export default Bonuses;
