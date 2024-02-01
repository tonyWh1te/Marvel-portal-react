import { useCallback, useState } from 'react';
import { Vision } from '../../../assets';
import CharInfo from '../CharInfo/CharInfo';
import CharList from '../CharList/CharList';
import ErrorBoundary from '../../../components/ErrorBoundary/ErrorBoundary';
import RandomChar from '../RandomChar/RandomChar';
import './HomePage.scss';

const HomePage = () => {
  const [selectedChar, setSelectedchar] = useState(null);

  const onCharSelected = useCallback(
    (id) => {
      setSelectedchar(id);
    },
    [setSelectedchar]
  );

  return (
    <>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className="char-content">
        <div className="container">
          <div className="char-content__inner">
            <ErrorBoundary>
              <CharList onCharSelected={onCharSelected} />
            </ErrorBoundary>
            <ErrorBoundary>
              <CharInfo charId={selectedChar} />
            </ErrorBoundary>
          </div>
        </div>
      </div>
      <img
        className="bg-decor"
        src={Vision}
        alt="vision"
      />
    </>
  );
};

export default HomePage;
