import Skeleton from '../../components/Loaders/Skeleton/Skeleton';
import Spinner from '../../components/Spinners/Spinner/Spinner';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

const setContent = (process, Component, data) => {
  switch (process) {
    case 'waiting':
      return <Skeleton />;
    case 'fetching':
      return <Spinner />;
    case 'error':
      return <ErrorMessage />;
    case 'success':
      return <Component data={data} />;
    default:
      return null;
  }
};

export default setContent;
