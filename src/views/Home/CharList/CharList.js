import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import CharListLoader from '../../../components/Loaders/CharListLoader/CharListLoader';
import MarvelService from '../../../services/MarvelService.service';
import './CharList.scss';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [newItemsLoading, setNewItemsLoading] = useState(true);
  const [firstLoading, setFirstLoading] = useState(true);
  const [offset, setOffset] = useState(100);
  const [charEnded, setCharEnded] = useState(false);

  const charRefs = useRef([]);

  const marvelService = new MarvelService();
  const { loading, error } = marvelService.http;

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
    marvelService.getAllCharacters(offset).then(onCharListLoaded);
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
    const items = (loading && firstLoading ? [...new Array(9)] : arr).map((item, i) => {
      if (loading && firstLoading) {
        return <CharListLoader key={i} />;
      } else {
        const { id, name, thumbnail } = item;
        const objectFit = thumbnail.includes('image_not_available') ? 'unset' : 'cover';

        return (
          <li
            className="char-content__list-item"
            key={id}
            tabIndex={0}
            onClick={() => {
              onCharSelected(id);
              onCharFocus(i);
            }}
            onKeyDown={(e) => onKeyDown(e, i, id)}
            ref={(el) => (charRefs.current[i] = el)}
          >
            <img className="char-content__img" src={thumbnail} alt={name} style={{ objectFit: objectFit }} />
            <p className="char-content__name">{name}</p>
          </li>
        );
      }
    });

    return <ul className="char-content__list">{items}</ul>;
  };

  const items = renderItems(charList);

  const errorMessage = error ? <ErrorMessage /> : null;

  return (
    <div className="char-content__box">
      {errorMessage}
      {items}
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
