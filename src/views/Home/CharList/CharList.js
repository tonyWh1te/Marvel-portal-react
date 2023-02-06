import { Abyss } from '../../../assets';
import Button from '../../../components/Button/Button';
import './CharList.scss';

export default function CharList() {
  return (
    <div className="char-content__box">
      <ul className="char-content__list">
        <li className="char-content__list-item char-content__list-item--selected">
          <a className="char-content__link" href="/#">
            <img className="char-content__img" src={Abyss} alt="abyss" />
            <p className="char-content__name">ABYYS</p>
          </a>
        </li>
        <li className="char-content__list-item ">
          <a className="char-content__link" href="/#">
            <img className="char-content__img" src={Abyss} alt="abyss" />
            <p className="char-content__name">ABYYS</p>
          </a>
        </li>
        <li className="char-content__list-item ">
          <a className="char-content__link" href="/#">
            <img className="char-content__img" src={Abyss} alt="abyss" />
            <p className="char-content__name">ABYYS</p>
          </a>
        </li>
        <li className="char-content__list-item ">
          <a className="char-content__link" href="/#">
            <img className="char-content__img" src={Abyss} alt="abyss" />
            <p className="char-content__name">ABYYS</p>
          </a>
        </li>
        <li className="char-content__list-item ">
          <a className="char-content__link" href="/#">
            <img className="char-content__img" src={Abyss} alt="abyss" />
            <p className="char-content__name">ABYYS</p>
          </a>
        </li>
        <li className="char-content__list-item ">
          <a className="char-content__link" href="/#">
            <img className="char-content__img" src={Abyss} alt="abyss" />
            <p className="char-content__name">ABYYS</p>
          </a>
        </li>
      </ul>
      <Button href={null} children={'LOAD MORE'} classes={['button__main', 'button__long']} />
    </div>
  );
}
