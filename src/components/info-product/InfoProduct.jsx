import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import WifiSharpIcon from '@mui/icons-material/WifiSharp';
import BrunchDiningSharpIcon from '@mui/icons-material/BrunchDiningSharp';
import LocalParkingSharpIcon from '@mui/icons-material/LocalParkingSharp';
import PoolSharpIcon from '@mui/icons-material/PoolSharp';
import FitnessCenterSharpIcon from '@mui/icons-material/FitnessCenterSharp';
import ChevronLeftSharpIcon from '@mui/icons-material/ChevronLeftSharp';
import FavoriteBorderSharpIcon from '@mui/icons-material/FavoriteBorderSharp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IosShareSharpIcon from '@mui/icons-material/IosShareSharp';
import InfoRight from '../../components/info-right/Info-right';
import ContentLoader from 'react-content-loader';
import './info-product.css';

const InfoProduct = () => {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favoriteHotels = JSON.parse(localStorage.getItem('favoriteHotels')) || [];
    setIsFavorite(favoriteHotels.includes(id));
  }, [id]);

  const toggleFavorite = () => {
    let favoriteHotels = JSON.parse(localStorage.getItem('favoriteHotels')) || [];

    if (isFavorite) {
      favoriteHotels = favoriteHotels.filter(favId => favId !== id);
      setIsFavorite(false);
      toast.info('Отель удален из избранного', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'dark',
      });
    } else {
      favoriteHotels.push(id);
      setIsFavorite(true);
      toast.success('Отель добавлен в избранное', {
        position: 'bottom-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'dark',
      });
    }

    localStorage.setItem('favoriteHotels', JSON.stringify(favoriteHotels));
  };

  const handleShare = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      toast.success('Ссылка скопирована в буфер обмена!', {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'dark',
      });
    } catch (err) {
      console.error('Ошибка при копировании:', err);
      toast.error('Ошибка при копировании ссылки', {
        position: 'bottom-right',
        theme: 'dark',
      });
    }
  };

  useEffect(() => {
    axios.get('https://otello-server.vercel.app/api/getall')
      .then(response => {
        const foundHotel = response.data.find(hotel => hotel._id === id);
        if (foundHotel) {
          setHotel(foundHotel);
        } else {
          setError('Отель не найден');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Ошибка при загрузке данных отеля:', error);
        setError('Ошибка при загрузке данных');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="hotel-info">
        <ContentLoader
          speed={2}
          width={1200}
          height={800}
          viewBox="0 0 1200 800"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          {/* Скелетон для навигации */}
          <rect x="20" y="20" rx="5" ry="5" width="100" height="30" />
          <rect x="1080" y="20" rx="5" ry="5" width="100" height="30" />

          {/* Скелетон для изображений */}
          <rect x="20" y="80" rx="5" ry="5" width="600" height="300" />
          <rect x="640" y="80" rx="5" ry="5" width="500" height="300" />

          {/* Скелетон для заголовка и описания */}
          <rect x="20" y="400" rx="5" ry="5" width="300" height="30" />
          <rect x="20" y="440" rx="5" ry="5" width="500" height="20" />

          {/* Скелетон для удобств */}
          <rect x="20" y="500" rx="5" ry="5" width="100" height="30" />
          <rect x="140" y="500" rx="5" ry="5" width="100" height="30" />
          <rect x="260" y="500" rx="5" ry="5" width="100" height="30" />
          <rect x="380" y="500" rx="5" ry="5" width="100" height="30" />
          <rect x="500" y="500" rx="5" ry="5" width="100" height="30" />

          {/* Скелетон для карты */}
          <rect x="20" y="560" rx="5" ry="5" width="1100" height="200" />

          {/* Скелетон для деталей */}
          <rect x="20" y="780" rx="5" ry="5" width="200" height="20" />
        </ContentLoader>
      </div>
    );
  }

  if (error) return <div>{error}</div>;
  if (!hotel) return <div>Отель не найден</div>;

  return (
    <div className="hotel-info">
      <ToastContainer />

      <div className="hotel__info__nav">
        <Link to={'/'}><ChevronLeftSharpIcon /> Назад</Link>
        <div className="hotel__info__nav__btn">
          <Link onClick={handleShare}><IosShareSharpIcon /> Поделиться</Link>
          <Link onClick={toggleFavorite}>
            {isFavorite ? <FavoriteIcon style={{ color: 'red' }} /> : <FavoriteBorderSharpIcon />}
            {isFavorite ? ' Убрать из избранного' : ' Добавить в избранное'}
          </Link>
        </div>
      </div>

      <div className="hotel__info__images">
        <div className="hotel__info__images__left">
          {hotel.rasm && hotel.rasm.length > 0 ? (
            <div className="hotel-images">
              {hotel.rasm.map((image, index) => (
                <img key={index} src={image} alt={`Hotel ${index + 1}`} className="hotel-image" />
              ))}
            </div>
          ) : (
            <p>Изображения отсутствуют</p>
          )}
        </div>
        <div className="hotel__info__images__right">
          <InfoRight hotel={hotel} />
        </div>
      </div>

      <div className="hotel-header">
        <span className="hotel-stars">
          {Array.from({ length: hotel.star }, (_, i) => '★').join('')} Отель
        </span>        <h1 className="hotel-title">{hotel.nomi}</h1>
        <p className="hotel-location">{hotel.manzil || 'Адрес не указан'}</p>
      </div>

      <div className="hotel-amenities">
        {hotel.wifi && <div className="amenity"><WifiSharpIcon /><span>Wi-Fi</span></div>}
        {hotel.parking && <div className="amenity"><LocalParkingSharpIcon /><span>Парковка</span></div>}
        {hotel.breakfast && <div className="amenity"><BrunchDiningSharpIcon /><span>Завтрак</span></div>}
        {hotel.pool && <div className="amenity"><PoolSharpIcon /><span>Бассейн</span></div>}
        {hotel.gym && <div className="amenity"><FitnessCenterSharpIcon /><span>Спортзал</span></div>}
        <div className="amenity__more__detail"><span>Подробнее</span></div>
      </div>

      {hotel.joylashuv ? (
        <div className="hotel-map">
          <p className="hotel__map__title">Места поблизости</p>
          <iframe
            title="hotel-location"
            width="100%"
            height="300"
            src={`https://maps.google.com/maps?q=${hotel.joylashuv}&output=embed`}
            style={{ border: 0 }}
            allowFullScreen
          />
        </div>
      ) : (
        <p>Местоположение не указано</p>
      )}

      <div className="hotel__info__detail">
        <p className="hotel-description">{hotel.malumoti || 'Информация о отеле отсутствует'}</p>
        <button>Подробнее</button>
      </div>
    </div>
  );
};

export default InfoProduct;