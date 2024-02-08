import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import './SingleCharLayout.scss';

const SingleCharLayout = ({ data }) => {
  const { name, description, thumbnail } = data;

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content={`The page with the ${name} hero`}
        />
        <title>{name}</title>
      </Helmet>
      <img
        src={thumbnail}
        alt={name}
        className="single-page__char-img"
      />
      <div className="single-page__char-info">
        <h6 className="single-page__char-title">{name}</h6>
        <p className="single-page__char-desc">{description}</p>
      </div>
    </>
  );
};

SingleCharLayout.propTypes = {
  data: PropTypes.object.isRequired,
};

export default SingleCharLayout;
