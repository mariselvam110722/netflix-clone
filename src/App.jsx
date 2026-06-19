import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';

const PageLoader = ({ hidden }) => (
  <div className={`page-loader ${hidden ? 'hidden' : ''}`}>
    <div className="loader-logo">
      <span
        style={{
          fontFamily: "'Bebas Neue', 'Arial Black', sans-serif",
          fontWeight: 400,
          fontSize: '64px',
          color: '#E50914',
          letterSpacing: '4px',
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        NETFLIX
      </span>
    </div>
  </div>
);

const App = () => {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    // Simulate initial app load delay
    const timer = setTimeout(() => setAppReady(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      <PageLoader hidden={appReady} />
      <Navbar />
      <Home />
    </div>
  );
};

export default App;
