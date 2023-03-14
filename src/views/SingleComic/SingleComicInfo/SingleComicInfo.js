import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import MarvelService from '../../../services/MarvelService.service';
import PropTypes from 'prop-types';
import Spinner from '../../../components/Spinner/Spinner';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import { XMen } from '../../../assets';
import './SingleComicInfo.scss';

const SingleComicInfo = ({ id }) => {
  const [comic, setComic] = useState(null);

  const marvelService = new MarvelService();
  const { loading, error, clearError } = marvelService.http;

  useEffect(() => {
    updateComic();
  }, [id]);

  const updateComic = () => {
    clearError();

    marvelService.getComic(id).then((comic) => {
      setComic(comic);
    });
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

  return (
    <section className="single-comic">
      <div className="container">
        {errorMessage}
        {spinner}
        {content}
      </div>
    </section>
  );
};

const View = ({ comic }) => {
  const { title, thumbnail, description, pages, language, price } = comic;

  return (
    <div className="single-comic__inner">
      <img className="single-comic__img" src={thumbnail} alt={title} />
      <div className="single-comic__info">
        <h6 className="single-comic__title">{title}</h6>
        <p className="single-comic__desc">{description}</p>
        <p className="single-comic__desc">{`${pages} pages`}</p>
        <p className="single-comic__desc">{`Language: ${language}`}</p>
        <b className="single-comic__price">{`${price}${typeof price === 'number' ? '$' : ''}`}</b>
      </div>
      <Link className="single-comic__back" to="/comics">
        Back to all
      </Link>
    </div>
  );
};

SingleComicInfo.propTypes = {
  id: PropTypes.string,
};

export default SingleComicInfo;
