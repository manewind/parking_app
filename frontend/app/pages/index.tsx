// pages/index.tsx
import React, { useState } from 'react'; // Убедитесь, что React импортирован

import Header from '../components/header';
import AuthModal from '../components/authModel';

const Index = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSignUpClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Header onSignUpClick={handleSignUpClick} />
      {isModalOpen && <AuthModal isOpen={isModalOpen} onClose={handleCloseModal} />}
    </div>
  );
};

export default Index;
