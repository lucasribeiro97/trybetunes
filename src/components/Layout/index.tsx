import { Outlet } from 'react-router-dom';
import Header from '../Header';
import './layout.css';

export default function Layout() {
  return (
    <div className="layout-container">
      <Header />
      <main className="main-container">
        <Outlet />
      </main>
    </div>
  );
}
