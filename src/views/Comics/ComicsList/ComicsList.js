import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { m } from 'framer-motion';
import Button from '../../../components/Button/Button';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import ItemsLoader from '../../../components/Loaders/ItemsLoader/ItemsLoader';
import MarvelService from '../../../services/MarvelService.service';
import { liVariants } from '../../../utils/constants';
import './ComicsList.scss';

const setContent = (process, Component, newItemsLoading) => {
  switch (process) {
    case 'fetching':
      return newItemsLoading ? (
        <Component />
      ) : (
        <ItemsLoader
          count={8}
          options={{ speed: 4, width: 225, height: 415, viewBox: '0 0 225 415' }}
          loader="comics"
          parentClasses="comics__list"
        />
      );
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

  const newComicsCount = 8;
  const newComicsList = newComicsLoading ? [] : comicsList.slice(-newComicsCount);
  const prevComicsList = comicsList.filter((item) => !newComicsList.some((newItem) => newItem.id === item.id));

  useEffect(() => {
    const initial = true;

    onRequest(offset, initial);
  }, []);

  const onComicsLoaded = (newComicsList) => {
    const ended = newComicsList.length < 8;

    setComicsList((comics) => [...comics, ...newComicsList]);
    setOffset((offset) => offset + 20);
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

  const renderItems = (items, isAnimated) => {
    return items.map((item, i) => {
      const { id, title, thumbnail, price } = item;

      const animate = isAnimated ? 'visible' : '';
      const initial = isAnimated ? 'hidden' : '';

      return (
        <m.li
          className="comics__item"
          key={id}
          variants={liVariants}
          animate={animate}
          initial={initial}
          custom={i}
          whileHover="comicHover"
        >
          <ComicsItem
            id={id}
            title={title}
            thumbnail={thumbnail}
            price={price}
          />
        </m.li>
      );
    });
  };

  const normalItems = renderItems(prevComicsList, false);
  const animatedItems = renderItems(newComicsList, true);

  const items = () => <ul className="comics__list">{[...normalItems, ...animatedItems]}</ul>;

  return (
    <div className="comics">
      <div className="container">
        {setContent(process, items, newComicsLoading)}
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

const ComicsItem = ({ id, thumbnail, title, price }) => {
  const objectFit = thumbnail.includes('image_not_available') ? 'unset' : 'cover';
  const currency = typeof price === 'number' ? '$' : '';

  return (
    <Link
      className="comics__link"
      to={`/comics/${id}`}
    >
      <img
        className="comics__img"
        src={thumbnail}
        alt={title}
        style={{ objectFit }}
      />
      <b className="comics__title">{title}</b>
      <b className="comics__price">{`${price}${currency}`}</b>
    </Link>
  );
};

export default ComicsList;
