import React from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/authContext';

const Header = () => {
  const { isLoggedIn, profilePicture, logout } = useAuth();

  return (
    <header className="bg-blue-800 text-white  p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          MyPark
        </Link>
        <nav className="flex items-center text-lg font-semibold space-x-4">
          <Link href="/memberships" className="hover:text-blue-400">
            Memberships
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-400" />
              )}
              <button
                onClick={logout}
                className="hover:text-blue-400 text-sm font-medium"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link href="/register" className="hover:text-blue-400">
              Sign Up
            </Link>
          )}
          <Link href="/booking" className="hover:text-blue-400">
            Booking
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
