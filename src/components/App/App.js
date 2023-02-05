import Header from '../Header/Header';
import HomePage from '../../views/Home/HomePage/HomePage';
import ComicsPage from '../../views/Comics/ComicsPage/ComicsPage';
import SingleComicPage from '../../views/SingleComic/SingleComicPage/SingleComicPage';

export default function App() {
  return (
    <div className="wrapper">
      <Header />
      <main className="main">
        {/* <HomePage /> */}
        {/* <ComicsPage /> */}
        <SingleComicPage />
      </main>
    </div>
  );
}
