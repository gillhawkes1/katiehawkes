"use client";
import React from 'react';
import Image from 'next/image';
import { socials } from '@/utils/staticdata';

const Footer: React.FC = () => {
  const iconSize: number = 23;
  const currentYear = new Date().getFullYear();
  return (
    <footer className="text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-3 ml-3">
          {socials.map((social, index) => (
            <a href={social.link} target="_blank" rel="noopener noreferrer" key={index}>
              <Image src={social.image} alt={social.title} width={iconSize} height={iconSize} />
            </a>
          ))}
        </div>
        <div className="text-center flex-grow">
          <p>&copy; {currentYear} Katie Hawkes | All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;