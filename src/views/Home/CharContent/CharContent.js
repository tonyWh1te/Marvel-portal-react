import ErrorBoundary from '../../../components/ErrorBoundary/ErrorBoundary';
import CharInfo from '../CharInfo/CharInfo';
import HomeSearchContainer from '../HomeSearch/HomeSearchContainer/HomeSearchContainer';
import CharList from '../CharList/CharList';

const CharContent = ({ media, selectedChar, onCharSelected }) => {
  const charInfoContent = (content) => <div className="char-content__info">{content}</div>;

  return (
    <div className="char-content">
      <div className="container">
        <div className="char-content__inner">
          <ErrorBoundary>
            <CharList onCharSelected={onCharSelected} />
          </ErrorBoundary>
          {!media && (
            <div className="char-content__left">
              <ErrorBoundary>
                <CharInfo charId={selectedChar}>{charInfoContent}</CharInfo>
              </ErrorBoundary>
              <ErrorBoundary>
                <HomeSearchContainer />
              </ErrorBoundary>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharContent;
