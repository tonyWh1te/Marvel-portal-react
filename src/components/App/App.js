import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from '../Layout/Layout';
import HomePage from '../../views/Home/HomePage/HomePage';
import ComicsPage from '../../views/Comics/ComicsPage/ComicsPage';
import NotFoundPage from '../../views/NotFound/NotFoundPage/NotFoundPage';
import SingleComicPage from '../../views/SingleComic/SingleComicPage/SingleComicPage';

const App = () => {
  return (
    <Router>
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="comics" element={<ComicsPage />} />
            <Route path="comics/:comicId" element={<SingleComicPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
