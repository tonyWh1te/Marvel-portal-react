import { memo, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import ItemsLoader from '../../../components/Loaders/ItemsLoader/ItemsLoader';
import MarvelService from '../../../services/MarvelService.service';
import './CharList.scss';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';

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

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [newItemsLoading, setNewItemsLoading] = useState(true);
  const [firstLoading, setFirstLoading] = useState(true);
  const [offset, setOffset] = useState(100);
  const [charEnded, setCharEnded] = useState(false);

  const charRefs = useRef([]);

  const marvelService = new MarvelService();
  const { process, setProcess } = marvelService.http;

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

  const onCharFocus = (id) => {
    charRefs.current.forEach((char) => char.classList.remove('char-content__list-item--selected'));

    charRefs.current[id].classList.add('char-content__list-item--selected');
    charRefs.current[id].focus();
  };

  const onCharSelected = (id) => {
    props.onCharSelected(id);
  };

  const onKeyDown = (e, i, id) => {
    if (e.keyCode === 13 || typeof e.keyCode === 'undefined') {
      onCharFocus(i);
      onCharSelected(id);
    }
  };

  const renderItems = (arr) => {
    return () => {
      const loading = process === 'fetching';

      const items = (loading && firstLoading ? [...new Array(9)] : arr).map((item, i) => {
        if (loading && firstLoading) {
          return (
            <ItemsLoader
              options={{ speed: 4, width: 200, height: 318, viewBox: '0 0 200 318' }}
              key={i}
            >
              <rect
                x="0"
                y="0"
                rx="0"
                ry="0"
                width="200"
                height="318"
              />
            </ItemsLoader>
          );
        } else {
          const { id, name, thumbnail } = item;
          const objectFit = thumbnail.includes('image_not_available') ? 'unset' : 'cover';

          return (
            <li
              className="char-content__list-item"
              key={id}
              tabIndex={0}
              onClick={() => {
                onCharFocus(i);
                onCharSelected(id);
              }}
              onKeyDown={(e) => onKeyDown(e, i, id)}
              ref={(el) => (charRefs.current[i] = el)}
            >
              <img
                className="char-content__img"
                src={thumbnail}
                alt={name}
                style={{ objectFit: objectFit }}
              />
              <p className="char-content__name">{name}</p>
            </li>
          );
        }
      });

      return <ul className="char-content__list">{items}</ul>;
    };
  };

  return <div className="char-content__box">{setContent(process, renderItems(charList))}</div>;
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default memo(CharList);
