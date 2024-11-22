import React, { useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../contexts/authContext';

const Header = () => {
  const { isLoggedIn, profilePicture, logout } = useAuth();

  useEffect(() => {
    console.log('Auth state changed:', isLoggedIn); // Добавьте для отладки
  }, [isLoggedIn]);

  return (
    <header className="bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          MyPark
        </Link>
        <nav className="flex items-center text-lg font-semibold space-x-4">
          <Link href="/memberships" className="hover:text-blue-400">
            Memberships
          </Link>
          <Link href="/booking" className="hover:text-blue-400">
            Booking
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center space-x-3">
              
              <button
                onClick={logout}
                className="hover:text-blue-400 text-xl font-medium"
              >
                Logout
              </button>
              <Link href="/profile">
              {profilePicture ? (
                <img
                  src={profilePicture}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />

              ) : null}
              </Link>
            </div>
          ) : (
            <>
              <Link href="/login" className="hover:text-blue-400">
                Login
              </Link>
              <Link href="/register" className="hover:text-blue-400">
                Sign Up
              </Link>
              
            </>
          )}

          
        </nav>
      </div>
    </header>
  );
};

export default Header;
