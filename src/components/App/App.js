import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { LazyMotion, domAnimation, AnimatePresence } from 'framer-motion';
import Layout from '../Layout/Layout';
import HomePage from '../../views/Home/HomePage/HomePage';

const ComicsPage = lazy(() => import('../../views/Comics/ComicsPage/ComicsPage'));
const NotFoundPage = lazy(() => import('../../views/NotFound/NotFoundPage/NotFoundPage'));
const SingleComicPage = lazy(() => import('../../views/SingleComic/SingleComicPage/SingleComicPage'));

const App = () => {
  const location = useLocation();

  return (
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
                path="comics/:comicId"
                element={<SingleComicPage />}
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
  );
};

export default App;
