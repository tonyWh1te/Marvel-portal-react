import ComicsList from '../ComicsList/ComicsList';
import Banner from '../../../components/Banner/Banner';
import AnimatedPage from '../../../components/Animatedpage/AnimatedPage';

const ComicsPage = () => {
  return (
    <AnimatedPage>
      <Banner />
      <ComicsList />
    </AnimatedPage>
  );
};

export default ComicsPage;
