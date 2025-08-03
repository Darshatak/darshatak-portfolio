import { useState, useEffect } from 'react';
import Hero from './components/Hero';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className="preloader fixed inset-0 flex items-center justify-center bg-bg-primary z-50">
          <div className="relative w-20 h-20 border-2 border-accent-primary rounded-full flex items-center justify-center animate-spin">
            <div className="loader-text font-mono text-accent-primary text-xl font-semibold">DV</div>
          </div>
        </div>
      ) : (
        <>
          {/* Cursor */}
          <div className="cursor hidden md:block"></div>
          <div className="cursor-follower hidden md:block"></div>
          
          {/* Hero Section */}
          <Hero />
          
          {/* Theme Toggle */}
          <button 
            className="theme-toggle fixed bottom-6 right-6 w-12 h-12 rounded-full bg-bg-secondary flex items-center justify-center z-20 shadow-accent"
            aria-label="Toggle theme"
          >
            <i className="fas fa-moon text-accent-primary"></i>
          </button>
        </>
      )}
    </>
  );
}

export default App;