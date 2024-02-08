import { lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import { HelmetProvider } from 'react-helmet-async';
import Layout from '../Layout/Layout';
import { pages } from '../../utils/constants';

const lazyLoadedPages = pages.reduce((acc, { name, path }) => {
  acc[name] = lazy(() => import(`../../views/${path}`));

  return acc;
}, {});

const { ComicsPage, HomePage, NotFoundPage, SinglePage, SingleCharLayout, SingleComicLayout } = lazyLoadedPages;

const App = () => {
  const location = useLocation();

  return (
    <HelmetProvider>
      <LazyMotion features={domAnimation}>
        <div className="wrapper">
          <AnimatePresence mode="wait">
            <Routes
              location={location}
              key={location.pathname}
            >
              <Route
                path="/"
                element={<Layout />}
              >
                <Route
                  index
                  element={<HomePage />}
                />
                <Route
                  path="comics"
                  element={<ComicsPage />}
                />
                <Route
                  path="comics/:id"
                  element={<SinglePage Component={SingleComicLayout} />}
                />
                <Route
                  path="characters/:id"
                  element={<SinglePage Component={SingleCharLayout} />}
                />
                <Route
                  path="*"
                  element={<NotFoundPage />}
                />
              </Route>
            </Routes>
          </AnimatePresence>
        </div>
      </LazyMotion>
    </HelmetProvider>
  );
};

export default App;
