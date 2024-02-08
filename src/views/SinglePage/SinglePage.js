import { useParams, useLocation } from 'react-router-dom';
import { useCommonContent } from '../../hooks';

const SinglePage = ({ Component }) => {
  const { id } = useParams();

  const location = useLocation();

  const type = location.pathname.split('/')[1];

  const { renderLayout, data, process } = useCommonContent({
    type,
    params: [id],
  });

  return renderLayout(Component, data, process);
};

export default SinglePage;
