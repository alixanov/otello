import React, { useEffect, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ReactDatePicker from 'react-datepicker';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloseIcon from '@mui/icons-material/Close';
import 'react-datepicker/dist/react-datepicker.css';
import GroupIcon from '@mui/icons-material/Group';
import KeyIcon from '@mui/icons-material/Key';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Для навигации между страницами
import "./search-page.css";

import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

const Search = () => {
  const [isCalendarOpen, setCalendarOpen] = useState(false);
  const [isLocationModalOpen, setLocationModalOpen] = useState(false);
  const [isGuestsModalOpen, setGuestsModalOpen] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [guestsText, setGuestsText] = useState('2 взрослых');

  const navigate = useNavigate(); // Хук для навигации

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const toggleCalendar = () => {
    setCalendarOpen(!isCalendarOpen);
  };

  const toggleLocationModal = () => {
    setLocationModalOpen(!isLocationModalOpen);
  };

  const toggleGuestsModal = () => {
    setGuestsModalOpen(!isGuestsModalOpen);
  };

  const handleSearchChange = (event) => {
    const text = event.target.value;
    setSearchText(text);
    const filtered = products.filter(product =>
      product.nomi.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    setSearchText(product.nomi);
    setLocationModalOpen(false);
  };

  const updateGuestsText = () => {
    let text = `${adults} взрослых`;
    if (children > 0) {
      text += `, ${children} детей`;
    }
    setGuestsText(text);
  };

  const applyGuests = () => {
    updateGuestsText();
    toggleGuestsModal();
  };

  const clearGuests = () => {
    setAdults(2);
    setChildren(0);
    setGuestsText('2 взрослых');
  };
  const handleSearchClick = () => {
    if (selectedProduct) {
      // Переход на страницу с информацией об отеле по ID отеля
      navigate(`/hotel/${selectedProduct._id}`);
    } else {
      Toastify({
        text: "Пожалуйста, выберите место для поиска.",
        duration: 3000,
        close: true,
        gravity: "top", // `top` или `bottom`
        position: "center", // `left`, `center` или `right`
        backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
        stopOnFocus: true, // Останавливает таймер при наведении
      }).showToast();
    }
  };

  useEffect(() => {
    axios
      .get('https://otello-server.vercel.app/api/getall')
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке данных:', error);
      });
  }, []);

  return (
    <div className='search__big__container'>
      <div className='search__container'>
        <div className='search__field' onClick={toggleLocationModal}>
          <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}>
            <LocationOnIcon size={20} color='#000' />
          </div>
          <input
            type='text'
            placeholder='Город, отель или направление'
            style={{ paddingLeft: '48px' }}
            value={selectedProduct ? selectedProduct.nomi : ''}
            readOnly
          />
        </div>

        <div className='search__field' onClick={toggleCalendar}>
          <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}>
            <CalendarMonthIcon size={20} color='#000' />
          </div>
          <input
            type='text'
            placeholder={`${startDate ? startDate.toLocaleDateString('ru-RU') : 'Выберите'} – ${endDate ? endDate.toLocaleDateString('ru-RU') : ''}`}
            style={{ paddingLeft: '48px' }}
            readOnly
          />
        </div>

        <div className='search__field' onClick={toggleGuestsModal}>
          <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }}>
            <GroupIcon size={20} color='#000' />
          </div>
          <input
            type='text'
            placeholder={guestsText}
            style={{ paddingLeft: '48px' }}
            readOnly
          />
        </div>
        <button className='search__button' onClick={handleSearchClick}>Найти</button>
      </div>

      {isCalendarOpen && (
        <div className='modal'>
          <div className='modal__content'>
            <button onClick={toggleCalendar} className='modal__close'>
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
              className={"react__date__picker"}
            />
            <button onClick={toggleCalendar} className='select__button'>
              Выбрать {startDate?.toLocaleDateString('ru-RU')} – {endDate?.toLocaleDateString('ru-RU')}
            </button>
          </div>
        </div>
      )}

      {isLocationModalOpen && (
        <div className='modal__location'>
          <div className='modal__content__location'>
            <button onClick={toggleLocationModal} className='location__modal__close'>
              <CloseIcon size={20} />
            </button>
            <h3 className="location__txt__title">Где хотите остановиться?</h3>
            <div className='modal__location__card'>
              <div className='modal__location__title'>
                <SearchIcon />
                <input
                  type='text'
                  placeholder='Город, отель или направление'
                  value={searchText}
                  onChange={handleSearchChange}
                />
              </div>
              <div className='modal__location__bottom__title'>
                <LocationOnIcon />
                <p>Искать отели рядом со мной</p>
              </div>
              <div className='modal__location__popular'>
                <span>Популярные направления</span>
                {filteredProducts.map((item, index) => (
                  <div key={index} className='modal__location__popular__map' onClick={() => handleProductSelect(item)}>
                    <p className="modal__location__txt" >{item.nomi}</p>
                  </div>
                ))}
              </div>
            </div>
            <button onClick={toggleLocationModal} className='location__select__button'>
              Выбрать
            </button>
          </div>
        </div>
      )}

      {isGuestsModalOpen && (
        <div className='modal__guests__container'>
          <div className='modal__guests'>
            <button onClick={toggleGuestsModal} className='modal__close__guests'>
              <CloseIcon size={20} />
            </button>
            <p>Гости</p>
            <div className='guests__controls'>
              <div className='guests__controls__title'>
                <p>Взрослые</p>
                <span>От 18 лет</span>
              </div>
              <div>
                <button onClick={() => setAdults(Math.max(1, adults - 1))}>-</button>
                <span>{adults}</span>
                <button onClick={() => setAdults(adults + 1)}>+</button>
              </div>
            </div>
            <div className='guests__controls'>
              <div className='guests__controls__title'>
                <b>Дети</b>
                <span>До 18 лет</span>
              </div>
              <div>
                <button onClick={() => setChildren(Math.max(0, children - 1))}>-</button>
                <span>{children}</span>
                <button onClick={() => setChildren(children + 1)}>+</button>
              </div>
            </div>
            <div className='guests__actions'>
              <button className='clear' onClick={clearGuests}>
                Очистить
              </button>
              <button className='primary' onClick={applyGuests}>
                Применить
              </button>
            </div>
          </div>
        </div>
      )}

      <div className='promo__container'>
        <div className='promo__code__title'>
          <div className='promo__code__title__txt'>
            <p className='promo__text'>Скидка 10% на первую бронь при оплате в приложении</p>
            <p className='promo__discount'>Скидка до 1000 ₽</p>
          </div>
          <div className='promo__code__title__qr-code'>
            <img
              src='https://api.qrserver.com/v1/create-qr-code/?size=64x64&data=OTELLO10'
              alt='QR Code'
              className='promo__code__qr'
            />
          </div>
        </div>

        <div className='promo__code'>
          <div className='promo__code-text'>
            <div className='search__prome__key__icon'>
              <KeyIcon />
            </div>
            <span>
              Промокод <b>OTELLO10</b>
            </span>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Search;
