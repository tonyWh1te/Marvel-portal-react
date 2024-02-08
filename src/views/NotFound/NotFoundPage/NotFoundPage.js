import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Button from '../../../components/Button/Button';
import ErrorMessage from '../../../components/ErrorMessage/ErrorMessage';
import './NotFoundPage.scss';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Page not found"
        />
        <title>Page not found</title>
      </Helmet>
      <div className="not-found">
        <div className="container">
          <div className="not-found__inner">
            <ErrorMessage />
            <p className="not-found__text">Page doesn't exist</p>
            <Button
              classes={['button__main', 'button__long']}
              onClick={goBack}
            >
              back
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
