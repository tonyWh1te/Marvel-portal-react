import { Link } from 'react-router-dom';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import './NotFoundPage.scss';

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <div className="container">
        <div className="not-found__inner">
          <ErrorMessage />
          <p className="not-found__text">Page doesn't exist</p>
          <Link to="/" className="not-found__link">
            Back to main page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
