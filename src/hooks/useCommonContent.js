import { useState, useEffect } from 'react';
import Banner from '../components/Banner/Banner';
import AnimatedPage from '../components/Animatedpage/AnimatedPage';
import MarvelService from '../services/MarvelService.service';
import setContent from '../utils/helpers/content.helper';

const useCommonContent = (requestedDataInfo) => {
  const [data, setData] = useState(null);

  const marvelService = new MarvelService();
  const { process, setProcess } = marvelService.http;

  useEffect(() => {
    const { type, params = [] } = requestedDataInfo;

    switch (type) {
      case 'comics':
        marvelService
          .getComic(...params)
          .then(onDataLoaded)
          .then(() => setProcess('success'));
        break;
      case 'characters':
        marvelService
          .getChar(...params)
          .then(onDataLoaded)
          .then(() => setProcess('success'));
        break;
      default:
        onDataLoaded(null);
        break;
    }
  }, []);

  const onDataLoaded = (data) => {
    setData(data);
  };

  const renderLayout = (Component, data, process) => (
    <AnimatedPage>
      <Banner />
      <div className="single-page">
        <div className="container">
          <div className="single-page__inner">{setContent(process, Component, data)}</div>
        </div>
      </div>
    </AnimatedPage>
  );

  return { renderLayout, data, process };
};

export default useCommonContent;
