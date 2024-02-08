import PropTypes from 'prop-types';
import './SingleCharLayout.scss';

const SingleCharLayout = ({ data }) => {
  const { name, description, thumbnail } = data;

  return (
    <>
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
