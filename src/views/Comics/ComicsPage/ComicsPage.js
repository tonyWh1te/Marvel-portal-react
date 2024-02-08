import { Helmet } from 'react-helmet-async';
import ComicsList from '../ComicsList/ComicsList';
import Banner from '../../../components/Banner/Banner';
import AnimatedPage from '../../../components/Animatedpage/AnimatedPage';

const ComicsPage = () => {
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="A page with a list of comics"
        />
        <title>Comics page</title>
      </Helmet>
      <AnimatedPage>
        <Banner />
        <ComicsList />
      </AnimatedPage>
    </>
  );
};

export default ComicsPage;
