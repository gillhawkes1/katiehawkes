import React from 'react';
import Link from 'next/link';

interface Route {
  path: string;
  label: string;
}

const routes: Route[] = [
  { path: '/', label: 'Home' },
  { path: '/aboutme', label: 'About Me' },
  { path: '/contactme', label: 'Contact Me' },
  { path: '/podcast', label: 'Podcast' }
];

const Nav: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-end pr-14">
        <ul className="flex space-x-12">
          {routes.map((route) => (
            <li key={route.path}>
              <Link href={route.path} className="text-white hover:text-gray-300">
                {route.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;