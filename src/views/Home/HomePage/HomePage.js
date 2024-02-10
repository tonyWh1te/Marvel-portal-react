import { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useMediaQuery } from '../../../hooks';
import { Vision } from '../../../assets';
import CharInfo from '../CharInfo/CharInfo';
import CharContent from '../CharContent/CharContent';
import ErrorBoundary from '../../../components/ErrorBoundary/ErrorBoundary';
import RandomChar from '../RandomChar/RandomChar';
import HomeSearchContainer from '../HomeSearch/HomeSearchContainer/HomeSearchContainer';
import AnimatedPage from '../../../components/Animatedpage/AnimatedPage';
import Modal from '../../../components/Modal/Modal';
import Portal from '../../../components/Portal/Portal';
import './HomePage.scss';

const HomePage = () => {
  const [selectedChar, setSelectedchar] = useState(null);
  const [modalActive, setModalActive] = useState(false);
  const media = useMediaQuery('lg');

  const onCharSelected = useCallback(
    (id) => {
      setSelectedchar(id);

      if (media) {
        setModalActive(true);
      }
    },
    [setSelectedchar, media]
  );

  const mobileSearch = media && (
    <div className="mobile-search">
      <div className="container">
        <ErrorBoundary>
          <HomeSearchContainer />
        </ErrorBoundary>
      </div>
    </div>
  );

  const modalContent = (content) => <>{content}</>;

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Marvel information portal"
        />
        <title>Marvel information portal</title>
      </Helmet>
      <AnimatedPage>
        <ErrorBoundary>
          <RandomChar />
        </ErrorBoundary>
        {mobileSearch}
        <CharContent
          media={media}
          selectedChar={selectedChar}
          onCharSelected={onCharSelected}
        />
        <img
          className="bg-decor"
          src={Vision}
          alt="vision"
        />
      </AnimatedPage>
      <Portal>
        <Modal
          active={modalActive}
          setActive={setModalActive}
        >
          <CharInfo charId={selectedChar}>{modalContent}</CharInfo>
        </Modal>
      </Portal>
    </>
  );
};

export default HomePage;
