import { Link } from 'react-router-dom';
import './HomeSearchResult.scss';

const HomeSearchResult = ({ data }) => {
  return data.length === 0 ? (
    <p className="char-search__error">The character was not found. Check the name and try again</p>
  ) : (
    <div className="char-search__wrapper">
      <p className="char-search__success">There is! Visit {data[0].name} page?</p>
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
