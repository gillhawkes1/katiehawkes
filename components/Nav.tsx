"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Route } from '@/app/interfaces/Routes';
// import Image from 'next/image';
// <Image src='/assets/banner_logo.png' alt="Contagious Confidecne Banner Logo" height={bannerLogoSize} width={bannerLogoSize} />


const routes: Route[] = [
  { path: '/', label: 'Home' },
  { path: '/aboutme', label: 'About Me' },
  { path: '/contactme', label: 'Contact Me' },
  { path: '/podcast', label: 'Podcast' }
];

const Nav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  //TODO: add functionality that closes nav after going to a new page from nav
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const bannerLogoSize: number = 0;

  return (
    <nav className="bg-white-800 text-white p-3">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-xl">Katie Hawkes
        </div>
        <div className="md:hidden" onClick={toggleMenu}>
          <button className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        <div className={`md:flex md:items-center ${isOpen ? 'block' : 'hidden'}`}>
          {routes.map((route) => (
            <Link key={route.path} href={route.path} className="block mt-4 md:mt-0 md:inline-block md:ml-6 text-white hover:text-gray-400">
              {route.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Nav;