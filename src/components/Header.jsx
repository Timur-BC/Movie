import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFavorites } from '../redux/favoritesSlice';

const Header = () => {
  const favorites = useSelector(selectFavorites);
  
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            MovieAppTulpar
          </Link>
          
          <nav className="nav">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link">Главная стр</Link>
              </li>
              <li className="nav-item">
                <Link to="/favorites" className="nav-link">
                  Избранное <span className="badge">{favorites.length}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;