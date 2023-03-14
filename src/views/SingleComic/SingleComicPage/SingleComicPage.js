import { useParams } from 'react-router-dom';
import SingleComicInfo from '../SingleComicInfo/SingleComicInfo';
import Banner from '../../../components/Banner/Banner';

const SingleComicPage = () => {
  const { comicId } = useParams();

  return (
    <>
      <Banner />
      <SingleComicInfo id={comicId} />
    </>
  );
};

export default SingleComicPage;
