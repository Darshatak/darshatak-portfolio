import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate navbar on initial render
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('.navbar-brand', 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 0.6 }
    )
    .fromTo('.navbar-item', 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5 }, 
      '-=0.3'
    );
  }, []);

  // Toggle menu animation
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    
    if (!isMenuOpen) {
      // Opening animation
      gsap.to('.navbar-menu', {
        x: 0,
        duration: 0.4,
        ease: 'power3.out',
      });
    } else {
      // Closing animation
      gsap.to('.navbar-menu', {
        x: '100%',
        duration: 0.4,
        ease: 'power3.in',
      });
    }
  };

  return (
    <nav className={`navbar fixed top-0 left-0 w-full py-4 z-50 transition-all duration-300 ${scrolled ? 'bg-bg-primary/90 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
        <a href="#home" className="navbar-brand flex items-center text-accent-primary">
          <span className="brand-bracket text-2xl">&lt;</span>
          <span className="brand-name text-xl font-bold mx-1 text-text-primary">Darshatak</span>
          <span className="brand-slash text-2xl">/</span>
          <span className="brand-bracket text-2xl">&gt;</span>
        </a>

        <button 
          className="navbar-toggle flex flex-col justify-center items-center w-10 h-10 relative z-50 lg:hidden"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span className={`hamburger-line block w-6 h-0.5 bg-text-primary transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`hamburger-line block w-6 h-0.5 bg-text-primary transition-all duration-300 mt-1.5 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`hamburger-line block w-6 h-0.5 bg-text-primary transition-all duration-300 mt-1.5 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>

        <ul className={`navbar-menu flex flex-col lg:flex-row items-start lg:items-center gap-8 fixed top-0 right-0 h-screen lg:h-auto w-3/4 lg:w-auto bg-bg-secondary lg:bg-transparent backdrop-blur-lg lg:backdrop-blur-none p-12 lg:p-0 lg:static transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'} transition-transform duration-300 ease-in-out`}>
          <li className="navbar-item">
            <a href="#home" className="navbar-link flex items-center gap-2 hover:text-accent-primary transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
              <span className="nav-number font-mono text-accent-primary">01.</span>
              <span className="nav-text">Home</span>
            </a>
          </li>
          <li className="navbar-item">
            <a href="#about" className="navbar-link flex items-center gap-2 hover:text-accent-primary transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
              <span className="nav-number font-mono text-accent-primary">02.</span>
              <span className="nav-text">About</span>
            </a>
          </li>
          <li className="navbar-item">
            <a href="#skills" className="navbar-link flex items-center gap-2 hover:text-accent-primary transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
              <span className="nav-number font-mono text-accent-primary">03.</span>
              <span className="nav-text">Skills</span>
            </a>
          </li>
          <li className="navbar-item">
            <a href="#projects" className="navbar-link flex items-center gap-2 hover:text-accent-primary transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
              <span className="nav-number font-mono text-accent-primary">04.</span>
              <span className="nav-text">Projects</span>
            </a>
          </li>
          <li className="navbar-item">
            <a href="#experience" className="navbar-link flex items-center gap-2 hover:text-accent-primary transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
              <span className="nav-number font-mono text-accent-primary">05.</span>
              <span className="nav-text">Experience</span>
            </a>
          </li>
          <li className="navbar-item">
            <a href="#contact" className="navbar-link flex items-center gap-2 hover:text-accent-primary transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
              <span className="nav-number font-mono text-accent-primary">06.</span>
              <span className="nav-text">Contact</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;