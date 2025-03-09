import React, { useContext, useState } from "react";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import KeyIcon from "@mui/icons-material/Key";
import "./cabinet.css";
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import TaskAltSharpIcon from "@mui/icons-material/TaskAltSharp";
import DialpadSharpIcon from '@mui/icons-material/DialpadSharp';
import { Link } from "react-router-dom"
import { WillTouch, Footer } from "../../components/"
import { ThemeContext } from "../../context/ThemeContext"; // Импортируйте контекст




const Cabinet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext); // Используйте контекст
  // Применяем тему к body
  React.useEffect(() => {
    document.body.setAttribute("data-theme", isDarkTheme ? "dark" : "light");
  }, [isDarkTheme]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="cabinet__big__container">
      <div className="cabinet__container">
        {/* Левая часть - вход в профиль */}
        <div className="cabinet__left">
          <AccountCircleSharpIcon className="cabinet__avatar" />
          <h2 className="cabinet__title">Войдите в профиль</h2>
          <p className="cabinet__subtitle">
            Чтобы получать кешбэк за каждую бронь <br /> и видеть ещё больше скидок
          </p>
          <button className="cabinet__button" onClick={openModal}>
            Войти или зарегистрироваться
          </button>
          <div className="cabinet__theme">
            <span>Тёмная тема</span>
            <label className="toggle-switch">
              <input type="checkbox" checked={isDarkTheme} onChange={toggleTheme} />
              <span className="slider"></span>
            </label>
          </div>
        </div>

        {/* Правая часть - скидка и промокод */}
        <div className="cabinet__right">
          <div className="promo__container">
            <div className="promo__code__title">
              <div className="promo__code__title__txt">
                <p className="promo__text">
                  Скидка 10% на первую бронь при оплате в приложении
                </p>
                <p className="promo__discount">Скидка до 1000 ₽</p>
              </div>
              <div className="promo__code__title__qr-code">
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=64x64&data=OTELLO10"
                  alt="QR Code"
                  className="promo__code__qr"
                />
              </div>
            </div>

            <div className="promo__code">
              <div className="promo__code-text">
                <div className="search__prome__key__icon">
                  <KeyIcon />
                </div>
                <span>
                  Промокод <b>OTELLO10</b>
                </span>
              </div>
            </div>
          </div>
        </div>

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
      <WillTouch /><Footer />
</div>
  );
};

export default Cabinet;