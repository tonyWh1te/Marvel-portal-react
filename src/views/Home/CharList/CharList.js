import { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { m } from 'framer-motion';
import ItemsLoader from '../../../components/Loaders/ItemsLoader/ItemsLoader';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import MarvelService from '../../../services/MarvelService.service';
import { liVariants } from '../../../utils/constants';
import './CharList.scss';

const setContent = (process, Component, firstLoading) => {
  switch (process) {
    case 'fetching':
      return !firstLoading ? (
        <Component />
      ) : (
        <ItemsLoader
          count={9}
          options={{ speed: 4, width: 200, height: 318, viewBox: '0 0 200 318' }}
          loader="chars"
          parentClasses="char-content__list"
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

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [newItemsLoading, setNewItemsLoading] = useState(true);
  const [firstLoading, setFirstLoading] = useState(true);
  const [offset, setOffset] = useState(100);
  const [charEnded, setCharEnded] = useState(false);

  const charRefs = useRef([]);

  const marvelService = new MarvelService();
  const { process, setProcess } = marvelService.http;

  const newCharsCount = 9;
  const newComicsList = newItemsLoading ? [] : charList.slice(-newCharsCount);
  const prevComicsList = charList.filter((item) => !newComicsList.some((newItem) => newItem.id === item.id));

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (newItemsLoading && !charEnded) {
      onRequest(offset);
    }
  }, [newItemsLoading]);

  const handleScroll = (e) => {
    const target = e.target;
    if (target.scrollHeight - target.clientHeight - target.scrollTop < 200) {
      setNewItemsLoading(true);
    }
  };

  const onCharListLoaded = (newCharList) => {
    const ended = newCharList.length < 9 ? true : false;

    setCharList((charList) => [...charList, ...newCharList]);
    setOffset((offset) => offset + 9);
    setNewItemsLoading(false);
    setFirstLoading(false);
    setCharEnded(ended);
  };

  const onRequest = (offset) => {
    marvelService
      .getAllCharacters(offset)
      .then(onCharListLoaded)
      .then(() => setProcess('success'));
  };

  const onCharSelected = (id) => {
    props.onCharSelected(id);
  };

  const onKeyDown = (e, i, id) => {
    if (e.keyCode === 13 || typeof e.keyCode === 'undefined') {
      onCharSelected(id);
    }
  };

  const onCharClick = (i, id) => {
    return () => {
      onCharSelected(id);
    };
  };

  const renderItems = (items, isAnimated) => {
    return items.map((item, i) => {
      const { id, name, thumbnail } = item;
      const objectFit = thumbnail.includes('image_not_available') ? 'unset' : 'cover';

      const animate = isAnimated ? 'visible' : '';
      const initial = isAnimated ? 'hidden' : '';

      return (
        <m.li
          className="char-content__list-item"
          key={id}
          tabIndex={0}
          onClick={onCharClick(i, id)}
          onKeyDown={(e) => onKeyDown(e, i, id)}
          ref={(el) => (charRefs.current[i] = el)}
          variants={liVariants}
          initial={initial}
          animate={animate}
          custom={i}
          whileHover="charHover"
          whileFocus="charHover"
          whileTap="tap"
        >
          <CharItem
            name={name}
            thumbnail={thumbnail}
            objectFit={objectFit}
          />
        </m.li>
      );
    });
  };

  const normalItems = renderItems(prevComicsList, false);
  const animatedItems = renderItems(newComicsList, true);

  const items = () => <ul className="char-content__list">{[...normalItems, ...animatedItems]}</ul>;

  return <div className="char-content__box">{setContent(process, items, firstLoading)}</div>;
};

const CharItem = ({ name, thumbnail, objectFit }) => {
  return (
    <>
      <img
        className="char-content__img"
        src={thumbnail}
        alt={name}
        style={{ objectFit }}
      />
      <p className="char-content__name">{name}</p>
    </>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default memo(CharList);
