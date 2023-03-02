import './Header.scss';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <h1 className="header__title">
            <a href="#">
              <span>Marvel</span> information portal
            </a>
          </h1>
          <nav className="header__menu">
            <ul className="header__menu-list">
              <li className="header__list-item">
                <a className="header__link" href="#">
                  Characters
                </a>
              </li>
              <li className="header__list-item">
                <a className="header__link" href="#">
                  Comics
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
