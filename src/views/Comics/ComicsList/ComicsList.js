import { useEffect, useState } from 'react';
import Button from '../../../components/Button/Button';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import ItemsLoader from '../../../components/Loaders/ItemsLoader/ItemsLoader';
import MarvelService from '../../../services/MarvelService.service';
import './ComicsList.scss';

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [newComicsLoading, setComicsLoading] = useState(true);
  const [comicsEnded, setComicsEnded] = useState(false);
  const [offset, setOffset] = useState(50);

  const marvelService = new MarvelService();
  const { loading, error, clearError } = marvelService.http;

  useEffect(() => onRequest(offset), []);

  const onComicsLoaded = (newComicsList) => {
    const ended = newComicsList.length < 8;

    setComicsList((comics) => [...comics, ...newComicsList]);
    setOffset((offset) => offset + 12);
    setComicsLoading(false);
    setComicsEnded(ended);
  };

  const onRequest = (offset) => {
    marvelService.getComics(offset).then(onComicsLoaded);
  };

  const onComicsUpload = () => {
    clearError();
    onRequest(offset);
  };

  const renderItems = (arr) => {
    const items = (loading && newComicsLoading ? [...new Array(8)] : arr).map((items, i) => {
      if (loading && newComicsLoading) {
        return (
          <ItemsLoader options={{ speed: 4, width: 225, height: 415, viewBox: '0 0 225 415' }} key={i}>
            <rect x="0" y="0" rx="0" ry="0" width="225" height="346" />
            <rect x="0" y="356" rx="0" ry="0" width="225" height="10" />
            <rect x="0" y="371" rx="0" ry="0" width="33" height="10" />
          </ItemsLoader>
        );
      } else {
        const { id, title, thumbnail, price } = items;
        const objectFit = thumbnail.includes('image_not_available') ? 'unset' : 'cover';

        return (
          <li className="comics__item" key={id}>
            <a className="comics__link" href="#">
              <img className="comics__img" src={thumbnail} alt={title} style={{ objectFit: objectFit }} />
              <b className="comics__title">{title}</b>
              <b className="comics__price">{`${price}${typeof price === 'number' ? '$' : ''}`}</b>
            </a>
          </li>
        );
      }
    });

    return <ul className="comics__list">{items}</ul>;
  };

  const items = renderItems(comicsList);
  const errorMessage = error ? <ErrorMessage /> : null;

  return (
    <div className="comics">
      <div className="container">
        {errorMessage}
        {items}
        <Button
          href={null}
          classes={['button__main', 'button__long']}
          onClick={onComicsUpload}
          btnProps={{ disabled: loading, styles: { display: comicsEnded ? 'none' : 'block' } }}
        >
          load more
        </Button>
      </div>
    </div>
  );
};

export default ComicsList;
