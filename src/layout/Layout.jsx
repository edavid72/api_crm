import React from 'react';
import { HiUserGroup } from 'react-icons/hi';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FaUserPlus } from 'react-icons/fa';

const Layout = () => {
  const location = useLocation();

  // get the route we visited
  const actualURL = location.pathname;

  return (
    <div className="md:flex md:min-h-screen">
      <div className="md:w-1/4 bg-[#24A19C] px-5 py-10">
        <h2 className="text-4xl font-black text-center uppercase text-gray-200">
          CRM -- Clients
        </h2>

        <nav>
          {/* Route #1 */}
          <Link
            to="/clients"
            className={`${
              actualURL === '/clients'
                ? 'text-[#9df2ef] font-semibold'
                : 'text-white'
            } text-2xl flex mt-4 hover:text-[#9df2ef] items-center`}
          >
            <HiUserGroup />
            <h2 className="ml-3">Cients</h2>
          </Link>
          {/* ---> End */}

          {/* Route #2 */}
          <Link
            to="/clients/new"
            className={`${
              actualURL === '/clients/new'
                ? 'text-[#9df2ef] font-extrabold'
                : 'text-white'
            } text-2xl flex mt-4 hover:text-[#9df2ef] items-center`}
          >
            <FaUserPlus />
            <h2 className="ml-3"> New Client</h2>
          </Link>
          {/* ---> End */}
        </nav>
      </div>

      <div className="md:w-3/4 p-10">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
