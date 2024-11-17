import React, { useState, useEffect } from 'react';
import Main from '../components/main';
import Header from '../components/header';

const Index = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Мы обновляем состояние только на клиенте
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; 
  }

  return (
    <div>
      <Header />
      <Main />
    </div>
  );
};

export default Index;
