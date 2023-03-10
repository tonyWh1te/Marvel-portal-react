import { NavLink, Link } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <h1 className="header__title">
            <Link to="/">
              <span>Marvel</span> information portal
            </Link>
          </h1>
          <nav className="header__menu">
            <ul className="header__menu-list">
              <li className="header__list-item">
                <NavLink
                  className="header__link"
                  end
                  to="/"
                  style={({ isActive }) => {
                    return {
                      color: isActive ? '#9f0013' : 'black',
                    };
                  }}
                >
                  Characters
                </NavLink>
              </li>
              <li className="header__list-item">
                <NavLink
                  className="header__link"
                  end
                  to="/comics"
                  style={({ isActive }) => {
                    return {
                      color: isActive ? '#9f0013' : 'black',
                    };
                  }}
                >
                  Comics
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
