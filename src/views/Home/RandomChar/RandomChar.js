import { Decor, Thor } from '../../../assets';
import Button from '../../../components/Button/Button';
import './RandomChar.scss';

export default function RandomChar() {
  return (
    <div className="random-char">
      <div className="container">
        <div className="random-char__inner">
          <div className="random-char__block">
            <img className="random-char__img" src={Thor} alt="char" />
            <div className="random-char__info">
              <b className="random-char__name">THOR</b>
              <p className="random-char__description">
                As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While
                others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate...
              </p>
              <div className="random-char__btns">
                <Button isLink={true} children={'homepage'} classes={['button__main']} />
                <Button isLink={true} children={'wiki'} classes={['button__secondary']} />
              </div>
            </div>
          </div>
          <div className="random-char__choice">
            <b className="random-char__title">
              Random character for today! <br />
              Do you want to get to know him better?
            </b>
            <b className="random-char__title">Or choose another one</b>
            <Button isLink={false} children={'try it'} classes={['button__main']} />
            <img className="random-char__decor" src={Decor} alt="decor" />
          </div>
        </div>
      </div>
    </div>
  );
}
