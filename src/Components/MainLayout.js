import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="g-sidenav-show bg-gray-100">
      <aside className="sidenav bg-white navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-4">
        <div className="sidenav-header">
          <button
            className="btn btn-link p-3 cursor-pointer text-secondary opacity-5 position-absolute end-0 top-0 d-none d-xl-none"
            aria-label="Close sidenav"
            id="iconSidenav"
          >
            <i className="fas fa-times" aria-hidden="true"></i>
          </button>
          <a className="navbar-brand m-0" href="/dashboard">
            <img src="./assets/img/logo-ct-dark.png" className="navbar-brand-img h-100" alt="main_logo" />
            <span className="ms-1 font-weight-bold">Argon Dashboard 2</span>
          </a>
        </div>
        <hr className="horizontal dark mt-0" />
        <div className="collapse navbar-collapse w-auto" id="sidenav-collapse-main">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/dashboard" className="nav-link active">
                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="ni ni-tv-2 text-primary text-sm opacity-10"></i>
                </div>
                <span className="nav-link-text ms-1">Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/articles" className="nav-link">
                <div className="icon icon-shape icon-sm border-radius-md text-center me-2 d-flex align-items-center justify-content-center">
                  <i className="ni ni-books text-primary text-sm opacity-10"></i>
                </div>
                <span className="nav-link-text ms-1">View Articles</span>
              </Link>
            </li>
            {/* Add other sidebar items here */}
          </ul>
        </div>
        <div className="sidenav-footer mx-3">
          {/* Sidebar footer content */}
        </div>
      </aside>
      <main className="main-content position-relative border-radius-lg">
        <nav className="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" id="navbarBlur" data-scroll="false">
          <div className="container-fluid py-1 px-3">
            {/* Navigation bar content */}
          </div>
        </nav>
        <div className="container-fluid">
          <Outlet /> {/* Child pages content */}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
