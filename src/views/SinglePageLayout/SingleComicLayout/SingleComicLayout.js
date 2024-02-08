import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './SingleComicLayout.scss';

const SingleComicLayout = ({ data }) => {
  const { title, thumbnail, description, pages, language, price } = data;

  const priceWithCurrency = `${price}${typeof price === 'number' ? '$' : ''}`;

  return (
    <>
      <img
        className="single-page__comic-img"
        src={thumbnail}
        alt={title}
      />
      <div className="single-page__comic-info">
        <h6 className="single-page__comic-title">{title}</h6>
        <p className="single-page__comic-desc">{description}</p>
        <p className="single-page__comic-desc">{`${pages} pages`}</p>
        <p className="single-page__comic-desc">{`Language: ${language}`}</p>
        <b className="single-page__comic-price">{priceWithCurrency}</b>
      </div>
      <Link
        className="single-page__comic-back"
        to="/comics"
      >
        Back to all
      </Link>
    </>
  );
};

SingleComicLayout.propTypes = {
  data: PropTypes.object.isRequired,
};

export default SingleComicLayout;
