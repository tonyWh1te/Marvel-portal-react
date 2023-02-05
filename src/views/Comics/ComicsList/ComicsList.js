import Button from '../../../components/Button/Button';
import { UW, XMen } from '../../../assets';
import './ComicsList.scss';

export default function ComicsList() {
  return (
    <div className="comics">
      <div className="container">
        <ul className="comics__list">
          <li className="comics__item">
            <a className="comics__link" href="#">
              <img className="comics__img" src={UW} alt="ultimate war" />
              <b className="comics__title">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</b>
              <b className="comics__price">9.99$</b>
            </a>
          </li>
          <li className="comics__item">
            <a className="comics__link" href="#">
              <img className="comics__img" src={XMen} alt="x-men" />
              <b className="comics__title">X-Men: Days of Future Past</b>
              <b className="comics__price">NOT AVAIBLE</b>
            </a>
          </li>
          <li className="comics__item">
            <a className="comics__link" href="#">
              <img className="comics__img" src={UW} alt="ultimate war" />
              <b className="comics__title">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</b>
              <b className="comics__price">9.99$</b>
            </a>
          </li>
          <li className="comics__item">
            <a className="comics__link" href="#">
              <img className="comics__img" src={XMen} alt="x-men" />
              <b className="comics__title">X-Men: Days of Future Past</b>
              <b className="comics__price">NOT AVAIBLE</b>
            </a>
          </li>
          <li className="comics__item">
            <a className="comics__link" href="#">
              <img className="comics__img" src={UW} alt="ultimate war" />
              <b className="comics__title">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</b>
              <b className="comics__price">9.99$</b>
            </a>
          </li>
          <li className="comics__item">
            <a className="comics__link" href="#">
              <img className="comics__img" src={XMen} alt="x-men" />
              <b className="comics__title">X-Men: Days of Future Past</b>
              <b className="comics__price">NOT AVAIBLE</b>
            </a>
          </li>
          <li className="comics__item">
            <a className="comics__link" href="#">
              <img className="comics__img" src={UW} alt="ultimate war" />
              <b className="comics__title">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</b>
              <b className="comics__price">9.99$</b>
            </a>
          </li>
          <li className="comics__item">
            <a className="comics__link" href="#">
              <img className="comics__img" src={XMen} alt="x-men" />
              <b className="comics__title">X-Men: Days of Future Past</b>
              <b className="comics__price">NOT AVAIBLE</b>
            </a>
          </li>
        </ul>
        <Button isLink={false} classNamees={['button__main', 'button__long']} children="load more" />
      </div>
    </div>
  );
}
