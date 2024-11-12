import React from 'react';
import Link from 'next/link';

interface HeaderProps {
  onSignUpClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSignUpClick }) => {
  return (
    <header className="bg-blue-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          MyPark
        </Link>
        <nav className="space-x-4">
          <button onClick={onSignUpClick} className="hover:text-blue-400">
            Sign Up
          </button>
          <Link href="/memberships" className="hover:text-blue-400">
            Memberships
          </Link>
          <Link href="/contact-us" className="hover:text-blue-400">
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
