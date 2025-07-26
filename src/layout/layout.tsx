// components/Layout.tsx
import { Outlet } from 'react-router-dom';
import Header from '../components/header/header';
import Rodape from '../components/rodape/rodape';

function Layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Rodape />
    </>
  );
}

export default Layout;
