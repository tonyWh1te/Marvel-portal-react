import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Spinner from '../Spinner/Spinner';
import Layout from '../Layout/Layout';
import HomePage from '../../views/Home/HomePage/HomePage';

const ComicsPage = lazy(() => import('../../views/Comics/ComicsPage/ComicsPage'));
const NotFoundPage = lazy(() => import('../../views/NotFound/NotFoundPage/NotFoundPage'));
const SingleComicPage = lazy(() => import('../../views/SingleComic/SingleComicPage/SingleComicPage'));

const App = () => {
  return (
    <Router>
      <div className="wrapper">
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path="comics" element={<ComicsPage />} />
              <Route path="comics/:comicId" element={<SingleComicPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
