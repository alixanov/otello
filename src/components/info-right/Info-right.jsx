import React, { useState } from 'react';
import { Calendar, Users, X as CloseIcon } from 'lucide-react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "./info-right.css";

function InfoRight({hotel}) {
  const [openDateModal, setOpenDateModal] = useState(false);
  const [openGuestsModal, setOpenGuestsModal] = useState(false);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);

  const handleOpenDateModal = () => setOpenDateModal(true);
  const handleCloseDateModal = () => setOpenDateModal(false);

  const handleOpenGuestsModal = () => setOpenGuestsModal(true);
  const handleCloseGuestsModal = () => setOpenGuestsModal(false);

  const handleAdultsChange = (delta) => {
    setAdults(Math.max(0, adults + delta));
  };

  const handleChildrenChange = (delta) => {
    setChildren(Math.max(0, children + delta));
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="info__right__container">
        <div className="info__right__card">
          <div className="info__right__box" onClick={handleOpenDateModal}>
            <Calendar className="icon" />
            <div className="info__right__box__txt">
              <p>
                {startDate?.toLocaleDateString('ru-RU') || 'Выберите дату'} — {endDate?.toLocaleDateString('ru-RU') || 'Выберите дату'}
              </p>

              <span>1 ночь</span>
            </div>
          </div>

          <div className="info__right__box" onClick={handleOpenGuestsModal}>
            <Users className="icon" />
            <div className="info__right__box__txt">
              <p>{adults} взрослых, {children} ребёнок</p>
              <span>Гости</span>
            </div>
          </div>
        </div>

        <div className="info__right__txt">
          <a href="#">{hotel?.nomi || 'Название не найдено'}</a>
          <a href="#">Доступные номера</a>
          <a href="#">Места поблизости</a>
          <a href="#">Описания отеля</a>
          <a href="#">Часто задаваемые вопросы</a>
        </div>

        {openDateModal && (
          <div className='calendar-modal' onClick={handleCloseDateModal}>
            <div className='calendar-modal-content' onClick={(e) => e.stopPropagation()}>
              <button onClick={handleCloseDateModal} className='calendar-modal-close'>
                <CloseIcon size={20} />
              </button>
              <h3>Даты поездки</h3>
              <ReactDatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                inline
                monthsShown={1}
                dateFormat='dd.MM.yyyy'
                showPopperArrow={false}
                locale='ru'
              />
              <button onClick={handleCloseDateModal} className='select__button'>
                Выбрать {startDate?.toLocaleDateString('ru-RU')} – {endDate?.toLocaleDateString('ru-RU')}
              </button>
            </div>
          </div>
        )}

        {openGuestsModal && (
          <div className="custom-modal" onClick={handleCloseGuestsModal}>
            <div className="custom-modal-content guests-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>Гости</h2>
                <button className="close-button" onClick={handleCloseGuestsModal}>
                  ✕
                </button>
              </div>

              <div className="guests-container">
                <div className="guest-type">
                  <div className="guest-info">
                    <h3>Взрослые</h3>
                    <p>От 18 лет</p>
                  </div>
                  <div className="guest-counter">
                    <button
                      className={`counter-btn ${adults <= 0 ? 'disabled' : ''}`}
                      onClick={() => handleAdultsChange(-1)}
                      disabled={adults <= 0}
                    >
                      −
                    </button>
                    <span className="counter-value">{adults}</span>
                    <button className="counter-btn" onClick={() => handleAdultsChange(1)}>
                      +
                    </button>
                  </div>
                </div>

                <div className="guest-type">
                  <div className="guest-info">
                    <h3>Дети</h3>
                  </div>
                  <div className="guest-counter">
                    <button
                      className={`counter-btn ${children <= 0 ? 'disabled' : ''}`}
                      onClick={() => handleChildrenChange(-1)}
                      disabled={children <= 0}
                    >
                      −
                    </button>
                    <span className="counter-value">{children}</span>
                    <button className="counter-btn" onClick={() => handleChildrenChange(1)}>
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button className="clear-button" onClick={() => {
                  setAdults(0);
                  setChildren(0);
                }}>
                  Очистить
                </button>
                <button className="apply-button" onClick={handleCloseGuestsModal}>
                  Применить
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InfoRight;