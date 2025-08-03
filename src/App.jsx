import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Hero from './components/Hero';
import Navbar from './components/Navbar';

function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const cursorRef = useRef(null);
  const cursorFollowerRef = useRef(null);

  // Handle loading screen
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Handle theme toggle
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setDarkMode(false);
      document.documentElement.classList.add('light-theme');
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    }
  };

  // Custom cursor effect
  useEffect(() => {
    if (loading) return;

    const cursor = cursorRef.current;
    const cursorFollower = cursorFollowerRef.current;

    if (!cursor || !cursorFollower) return;

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
      
      gsap.to(cursorFollower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
      });
    };

    const handleMouseEnter = () => {
      gsap.to([cursor, cursorFollower], {
        opacity: 1,
        duration: 0.3,
      });
    };

    const handleMouseLeave = () => {
      gsap.to([cursor, cursorFollower], {
        opacity: 0,
        duration: 0.3,
      });
    };

    const handleLinkHover = () => {
      gsap.to(cursor, {
        scale: 1.5,
        duration: 0.3,
      });
      gsap.to(cursorFollower, {
        scale: 1.5,
        duration: 0.3,
      });
    };

    const handleLinkLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
      });
      gsap.to(cursorFollower, {
        scale: 1,
        duration: 0.3,
      });
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    const links = document.querySelectorAll('a, button');
    links.forEach(link => {
      link.addEventListener('mouseenter', handleLinkHover);
      link.addEventListener('mouseleave', handleLinkLeave);
    });

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);

      links.forEach(link => {
        link.removeEventListener('mouseenter', handleLinkHover);
        link.removeEventListener('mouseleave', handleLinkLeave);
      });
    };
  }, [loading]);

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
          {/* Custom Cursor */}
          <div 
            ref={cursorRef} 
            className="cursor fixed w-5 h-5 rounded-full bg-accent-primary mix-blend-difference z-[9999] pointer-events-none opacity-0 transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
          ></div>
          <div 
            ref={cursorFollowerRef} 
            className="cursor-follower fixed w-10 h-10 rounded-full border-2 border-accent-primary z-[9998] pointer-events-none opacity-0 transform -translate-x-1/2 -translate-y-1/2 hidden md:block"
          ></div>
          
          {/* Navbar */}
          <Navbar />
          
          {/* Hero Section */}
          <Hero />
          
          {/* Theme Toggle */}
          <button 
            className="theme-toggle fixed bottom-6 right-6 w-12 h-12 rounded-full bg-bg-secondary flex items-center justify-center z-20 shadow-accent"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} text-accent-primary`}></i>
          </button>
        </>
      )}
    </>
  );
}

export default App;