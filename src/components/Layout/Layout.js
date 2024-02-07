import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Spinner from '../../components/Spinners/Spinner/Spinner';
import Header from '../Header/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </main>
    </>
  );
};

export default Layout;
