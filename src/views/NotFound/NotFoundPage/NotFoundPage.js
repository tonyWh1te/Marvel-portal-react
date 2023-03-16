import { Link, useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import './NotFoundPage.scss';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <div className="not-found">
      <div className="container">
        <div className="not-found__inner">
          <ErrorMessage />
          <p className="not-found__text">Page doesn't exist</p>
          <Button href={null} classes={['button__main', 'button__long']} onClick={goBack}>
            back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
