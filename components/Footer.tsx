import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-grey-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; {currentYear} katehawkes.com | All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;