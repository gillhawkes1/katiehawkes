"use client";
import React from 'react';
import Image from 'next/image';
import { socials } from '@/staticdata';

const Footer: React.FC = () => {
  const iconSize: number = 23;
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-grey-800 text-white py-4">
      <div className="container mx-auto">
        <div className="flex w-48 space-x-2">
          {socials.map(social => (
              <a href={social.link} target="_blank" rel="noopener noreferrer">
                <Image src={social.image} alt={social.title} width={iconSize} height={iconSize} />
              </a>
          ))}
        </div>
        <div className='text-center'>
          <p className="flex justify-center">&copy; {currentYear} Katie Hawkes | All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;