import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <p className="copyright">
            &copy; {currentYear} MovieApp. Данные предоставлены The Movie Database (TMDB)
          </p>
          <div className="tmdb-attribution">
            Tulpar. Данные предоставлены TCIB
            {/* <img 
              src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" 
              alt="TMDB Logo" 
              className="tmdb-logo" 
            /> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;