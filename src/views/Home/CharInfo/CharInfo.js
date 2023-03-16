import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Spinner from '../../../components/Spinner/Spinner';
import Skeleton from '../../../components/Loaders/Skeleton/Skeleton';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import Button from '../../../components/Button/Button';
import MarvelService from '../../../services/MarvelService.service';
import './CharInfo.scss';

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const marvelService = new MarvelService();
  const { loading, error, clearError } = marvelService.http;

  useEffect(() => updateChar(), [props.charId]);

  const updateChar = () => {
    const { charId } = props;

    if (!charId) {
      return;
    }

    clearError();

    marvelService.getCharacter(charId).then((char) => {
      setChar(char);
    });
  };

  const skeleton = !(error || loading || char) ? <Skeleton /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !char) ? <View char={char} /> : null;

  return (
    <div className="char-content__info">
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({ char: { name, description, thumbnail, homepage, wiki, comics } }) => {
  const objectFit = thumbnail.includes('image_not_available') ? 'contain' : 'cover';

  return (
    <>
      <div className="char-content__block">
        <img className="char-content__info-img" src={thumbnail} alt={name} style={{ objectFit: objectFit }} />
        <div>
          <b className="char-content__info-name">{name}</b>
          <div className="char-content__btns">
            <Button href={homepage} classes={['button__main']}>
              homepage
            </Button>
            <Button href={wiki} classes={['button__secondary']}>
              wiki
            </Button>
          </div>
        </div>
      </div>
      <p className="char-content__descr">{description}</p>
      <b className="char-content__comics">Comics:</b>
      <ul className="char-content__comics-list">
        {comics.length > 0 ? null : 'There is no comics with this character'}
        {comics.map(({ name, resourceURI }, i) => {
          const comicId = resourceURI.match(/\d+$/)[0];

          return i < 10 ? (
            <li className="char-content__comics-item" key={i}>
              <Link className="char-content__link" to={`/comics/${comicId}`}>
                {name}
              </Link>
            </li>
          ) : null;
        })}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;
