import { Link } from 'react-router-dom';
import './HomeSearchResult.scss';

const HomeSearchResult = ({ data }) => {
  return data.length === 0 ? (
    <p className="char-content__search-error">The character was not found. Check the name and try again</p>
  ) : (
    <div className="char-content__search-wrapper">
      <p className="char-content__search-success">There is! Visit {data[0].name} page?</p>
      <Link
        to={`/characters/${data[0].id}`}
        className="button button__secondary"
      >
        <div className="inner">to page</div>
      </Link>
    </div>
  );
};

export default HomeSearchResult;
