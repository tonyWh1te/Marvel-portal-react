import { useParams } from 'react-router-dom';
import SingleComicInfo from '../SingleComicInfo/SingleComicInfo';
import Banner from '../../../components/Banner/Banner';
import AnimatedPage from '../../../components/Animatedpage/AnimatedPage';

const SingleComicPage = () => {
  const { comicId } = useParams();

  return (
    <AnimatedPage>
      <Banner />
      <SingleComicInfo id={comicId} />
    </AnimatedPage>
  );
};

export default SingleComicPage;
