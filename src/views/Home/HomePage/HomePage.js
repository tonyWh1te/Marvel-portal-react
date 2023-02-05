import { Vision } from '../../../assets';
import CharInfo from '../CharInfo/CharInfo';
import CharList from '../CharList/CharList';
import RandomChar from '../RandomChar/RandomChar';
import './HomePage.scss';

export default function HomePage() {
  return (
    <>
      <RandomChar />
      <div className="char-content">
        <div className="container">
          <div className="char-content__inner">
            <CharList />
            <CharInfo />
          </div>
        </div>
      </div>
      <img className="bg-decor" src={Vision} alt="vision" />
    </>
  );
}
