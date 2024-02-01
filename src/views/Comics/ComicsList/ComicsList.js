import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Button from '../../../components/Button/Button';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import ItemsLoader from '../../../components/Loaders/ItemsLoader/ItemsLoader';
import MarvelService from '../../../services/MarvelService.service';
import './ComicsList.scss';

const setContent = (process, Component) => {
  switch (process) {
    case 'fetching':
      return <Component />;
    case 'error':
      return <ErrorMessage />;
    case 'success':
      return <Component />;
    default:
      return null;
  }
};

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [newComicsLoading, setNewComicsLoading] = useState(false);
  const [comicsEnded, setComicsEnded] = useState(false);
  const [offset, setOffset] = useState(50);

  const marvelService = new MarvelService();
  const { clearError, process, setProcess } = marvelService.http;

  useEffect(() => onRequest(offset, true), []);

  const onComicsLoaded = (newComicsList) => {
    const ended = newComicsList.length < 8;

    setComicsList((comics) => [...comics, ...newComicsList]);
    setOffset((offset) => offset + 12);
    setNewComicsLoading(false);
    setComicsEnded(ended);
  };

  const onRequest = (offset, initial) => {
    initial ? setNewComicsLoading(false) : setNewComicsLoading(true);

    marvelService
      .getComics(offset)
      .then(onComicsLoaded)
      .then(() => setProcess('success'));
  };

  const onComicsUpload = () => {
    clearError();
    onRequest(offset);
  };

  const renderItems = (arr) => {
    return () => {
      const loading = process === 'fetching';

      const items = (loading && !newComicsLoading ? [...new Array(8)] : arr).map((items, i) => {
        if (loading && !newComicsLoading) {
          return (
            <ItemsLoader
              options={{ speed: 4, width: 225, height: 415, viewBox: '0 0 225 415' }}
              key={i}
            >
              <rect
                x="0"
                y="0"
                rx="0"
                ry="0"
                width="225"
                height="346"
              />
              <rect
                x="0"
                y="356"
                rx="0"
                ry="0"
                width="225"
                height="10"
              />
              <rect
                x="0"
                y="371"
                rx="0"
                ry="0"
                width="33"
                height="10"
              />
            </ItemsLoader>
          );
        } else {
          const { id, title, thumbnail, price } = items;
          const objectFit = thumbnail.includes('image_not_available') ? 'unset' : 'cover';

          return (
            <li
              className="comics__item"
              key={id}
            >
              <Link
                className="comics__link"
                to={`/comics/${id}`}
              >
                <img
                  className="comics__img"
                  src={thumbnail}
                  alt={title}
                  style={{ objectFit: objectFit }}
                />
                <b className="comics__title">{title}</b>
                <b className="comics__price">{`${price}${typeof price === 'number' ? '$' : ''}`}</b>
              </Link>
            </li>
          );
        }
      });

      return <ul className="comics__list">{items}</ul>;
    };
  };

  return (
    <div className="comics">
      <div className="container">
        {setContent(process, renderItems(comicsList))}
        <Button
          classes={['button__main', 'button__long']}
          onClick={onComicsUpload}
          btnProps={{ disabled: newComicsLoading, styles: { display: comicsEnded ? 'none' : 'block' } }}
        >
          load more
        </Button>
      </div>
    </div>
  );
};

export default ComicsList;
