import { Avengers, AvengersLogo } from '../../assets';
import './Banner.scss';

export default function Banner() {
  return (
    <div className="banner">
      <div className="container">
        <div className="banner__inner">
          <img className="banner__avengers" src={Avengers} alt="avengers" />
          <b className="banner__text">
            New comics every week!
            <br />
            Stay tuned!
          </b>
          <img className="banner__avengers-logo" src={AvengersLogo} alt="logo" />
        </div>
      </div>
    </div>
  );
}
