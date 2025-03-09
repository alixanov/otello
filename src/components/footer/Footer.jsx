import React, { useContext } from "react";
import "./footer.css"; // Подключаем стили
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import TelegramIcon from "@mui/icons-material/Telegram";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import BusinessIcon from "@mui/icons-material/Business";
import HotelIcon from "@mui/icons-material/Hotel";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";
import HuaweiIcon from "@mui/icons-material/Android"; // Нет отдельной иконки Huawei в MUI, используем Android
import qrCode from "../../assets/qr-code.png";
import qrCodeWhite from "../../assets/qr-white.png"
import location from "../../assets/location-img.png";
import { ThemeContext } from "../../context/ThemeContext"; // Импортируем контекст

const Footer = () => {
     const { isDarkTheme } = useContext(ThemeContext); // Получаем текущую тему

     return (
          <div className="footer__container">
               <div className="footer__content">
                    {/* Левая часть */}
                    <div className="footer__left">
                         <div className="footer__column">
                              <h4>Клиентам</h4>
                              <p>
                                   <HelpOutlineIcon className="footer__icon" /> Поддержка
                              </p>
                              <p>
                                   <TelegramIcon className="footer__icon" /> Телеграм-канал
                              </p>
                              <p>
                                   <CardGiftcardIcon className="footer__icon" /> Подарочный сертификат
                              </p>
                              <p>
                                   <BusinessIcon className="footer__icon" /> Все направления
                              </p>
                         </div>

                         <div className="footer__column">
                              <h4>Партнёрам</h4>
                              <p>
                                   <HotelIcon className="footer__icon" /> Подключение отеля
                              </p>
                              <p>
                                   <VpnKeyIcon className="footer__icon" /> Личный кабинет
                              </p>
                         </div>
                    </div>

                    {/* Правая часть (QR-код и значки платформ) */}
                    <div className="footer__right">
                         <div className="qr-code">
                              {/* Меняем изображение в зависимости от темы */}
                              <img
                                   src={isDarkTheme ? qrCodeWhite : qrCode} // Используем qrCodeWhite для тёмной темы
                                   alt="QR Code"
                                   className="qr-code-img"
                              />
                              <img src={location} alt="Location" className="location-img" />

                              <div className="app-icons">
                                   <div className="app-icons-box">
                                        <AndroidIcon className="platform-icon" />
                                   </div>
                                   <div className="app-icons-box">
                                        <AppleIcon className="platform-icon" />
                                   </div>
                                   <div className="app-icons-box">
                                        <HuaweiIcon className="platform-icon" />
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>

               {/* Нижний блок с политиками */}
               <div className="footer__bottom">
                    <div className="footer__left__txt">
                         <span>© 2025 Отелло. Проект компании 2ГИС</span>
                    </div>
                    <div className="footer__links">
                         <p>Лицензионное соглашение</p>
                         <p>Политика конфиденциальности</p>
                         <p>Политика обработки ПД</p>
                         <p>Рекомендательные технологии</p>
                         <p>Правила программы лояльности</p>
                    </div>
               </div>
          </div>
     );
};

export default Footer;