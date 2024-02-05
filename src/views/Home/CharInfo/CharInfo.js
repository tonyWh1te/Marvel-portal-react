import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { m } from 'framer-motion';
import Button from '../../../components/Button/Button';
import MarvelService from '../../../services/MarvelService.service';
import setContent from '../../../utils/helpers/content.helper';
import { divVariants } from '../../../utils/constants';
import './CharInfo.scss';

const CharInfo = (props) => {
  const [char, setChar] = useState(null);

  const marvelService = new MarvelService();
  const { clearError, process, setProcess } = marvelService.http;

  useEffect(() => updateChar(), [props.charId]);

  const updateChar = () => {
    const { charId } = props;

    if (!charId) {
      return;
    }

    clearError();

    marvelService.getCharacter(charId).then((char) => {
      setChar(char);
      setProcess('success');
    });
  };

  return <div className="char-content__info">{setContent(process, View, char)}</div>;
};

const View = ({ data }) => {
  const { name, description, thumbnail, homepage, wiki, comics } = data;
  const objectFit = thumbnail.includes('image_not_available') ? 'contain' : 'cover';

  return (
    <m.div
      variants={divVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="char-content__block">
        <img
          className="char-content__info-img"
          src={thumbnail}
          alt={name}
          style={{ objectFit: objectFit }}
        />
        <div>
          <b className="char-content__info-name">{name}</b>
          <div className="char-content__btns">
            <Button
              href={homepage}
              classes={['button__main']}
            >
              homepage
            </Button>
            <Button
              href={wiki}
              classes={['button__secondary']}
            >
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
            <li
              className="char-content__comics-item"
              key={i}
            >
              <Link
                className="char-content__link"
                to={`/comics/${comicId}`}
              >
                {name}
              </Link>
            </li>
          ) : null;
        })}
      </ul>
    </m.div>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;
