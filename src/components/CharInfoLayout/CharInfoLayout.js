import { Link } from 'react-router-dom';
import { m } from 'framer-motion';
import Button from '../Button/Button';
import { divVariants } from '../../utils/constants';
import './CharInfoLayout.scss';

const CharInfoLayout = ({ data }) => {
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

export default CharInfoLayout;
