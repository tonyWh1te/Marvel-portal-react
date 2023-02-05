import { XMen } from '../../../assets';
import './SingleComicInfo.scss';

export default function SingleComicInfo() {
  return (
    <section className="single-comic">
      <div className="container">
        <div className="single-comic__inner">
          <img className="single-comic__img" src={XMen} alt="comic" />
          <div className="single-comic__info">
            <h6 className="single-comic__title">X-Men: Days of Future Past</h6>
            <p className="single-comic__desc">
              Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and the X-Men are humanity's
              only hope...until they die! Also featuring the first appearance of Alpha Flight, the return of the Wendigo, the history of the X-Men
              from Cyclops himself...and a demon for Christmas!?
            </p>
            <p className="single-comic__desc">144 pages</p>
            <p className="single-comic__desc">Language: en-us</p>
            <b className="single-comic__price">9.99$</b>
          </div>
          <a className="single-comic__back" href="#">
            Back to all
          </a>
        </div>
      </div>
    </section>
  );
}
