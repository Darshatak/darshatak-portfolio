import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import * as THREE from 'three';
import DotGrid from './backgrounds/DotGrid';
import SplitText from './animations/SplitText';

const Hero = () => {
  const threeCanvasRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth <= 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  // Initialize Three.js background
  useEffect(() => {
    if (!threeCanvasRef.current) return;

    const canvas = threeCanvasRef.current;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const scene = new THREE.Scene();

    // Create geometry for floating shapes
    const createShape = (geometry, color, position, rotation) => {
      const material = new THREE.MeshStandardMaterial({
        color,
        transparent: true,
        opacity: 0.8,
        roughness: 0.5,
        metalness: 0.8,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...position);
      mesh.rotation.set(...rotation);
      return mesh;
    };

    // Add floating shapes
    const shapes = [
      createShape(
        new THREE.TorusGeometry(1, 0.3, 16, 32),
        0x64ffda,
        [-2, 1, -2],
        [Math.PI / 4, Math.PI / 6, 0]
      ),
      createShape(
        new THREE.IcosahedronGeometry(0.8, 0),
        0x7c3aed,
        [2, -1, -1],
        [0, Math.PI / 4, Math.PI / 6]
      ),
      createShape(
        new THREE.OctahedronGeometry(0.6, 0),
        0xf59e0b,
        [0, 1.5, -3],
        [Math.PI / 6, 0, Math.PI / 4]
      ),
    ];

    shapes.forEach(shape => scene.add(shape));

    // Add ambient and directional light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Animation loop
    let requestId;
    const animate = () => {
      requestId = requestAnimationFrame(animate);
      
      // Rotate shapes
      shapes.forEach((shape, i) => {
        const speed = 0.002 * (i + 1);
        shape.rotation.x += speed;
        shape.rotation.y += speed * 0.8;
      });
      
      renderer.render(scene, camera);
    };
    animate();

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestId);
      scene.clear();
      renderer.dispose();
    };
  }, []);

  // Animate elements
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo('.social-sidebar', 
      { opacity: 0, x: -50 }, 
      { opacity: 1, x: 0, duration: 1, delay: 0.5 }
    )
    .fromTo('.email-sidebar', 
      { opacity: 0, x: 50 }, 
      { opacity: 1, x: 0, duration: 1 }, 
      '<'
    )
    .fromTo('.hero-stats .stat-card', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.8 }, 
      '-=0.5'
    )
    .fromTo('.hero-cta', 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 0.8 }, 
      '-=0.2'
    );
    
    return () => tl.kill();
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center">
      {/* Background */}
      <div className="hero-bg absolute inset-0 -z-10">
        <div className="grid-pattern absolute inset-0 bg-[radial-gradient(rgba(100,255,218,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="floating-shapes">
          <canvas ref={threeCanvasRef} className="absolute inset-0 w-full h-full" />
        </div>
        
        {/* DotGrid from ReactBits */}
        <div className="absolute inset-0 -z-10 opacity-60">
          <DotGrid 
            dotSize={4}
            gap={40}
            baseColor="rgba(100, 255, 218, 0.2)"
            activeColor="rgba(100, 255, 218, 0.6)"
            proximity={100}
          />
        </div>
      </div>

      {/* Side Elements */}
      <div className="side-elements fixed left-10 bottom-0 hidden lg:block z-10">
        <div className="social-sidebar flex flex-col items-center gap-6">
          <a href="https://github.com/Darshatak" className="social-link" target="_blank" rel="noopener">
            <i className="fab fa-github text-xl"></i>
          </a>
          <a href="https://www.linkedin.com/in/darshatakvyas" className="social-link" target="_blank" rel="noopener">
            <i className="fab fa-linkedin-in text-xl"></i>
          </a>
          <a href="https://www.instagram.com/darshatak/" className="social-link" target="_blank" rel="noopener">
            <i className="fab fa-instagram text-xl"></i>
          </a>
          <div className="social-line w-[1px] h-24 bg-text-secondary"></div>
        </div>
      </div>

      <div className="side-elements fixed right-10 bottom-0 hidden lg:block z-10">
        <div className="email-sidebar flex flex-col items-center">
          <a href="mailto:connect@darshatak.in" className="email-link font-mono text-text-secondary hover:text-accent-primary transition-colors duration-300 [writing-mode:vertical-rl]">
            connect@darshatak.in
          </a>
          <div className="email-line w-[1px] h-24 bg-text-secondary mt-6"></div>
        </div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 lg:px-12">
        <div className="hero-content max-w-4xl">
          <p className="hero-greeting font-mono text-accent-primary mb-6 opacity-90">
            Hi, my name is
          </p>

          <h1 className="hero-title mb-6">
            <div className="title-line text-5xl md:text-7xl font-bold mb-2">
              <SplitText 
                text="Darshatak Vyas." 
                splitType="chars"
                isMobile={isMobile}
                delay={30}
                className="block"
                from={{ opacity: 0, y: 50 }}
                to={{ opacity: 1, y: 0 }}
                ease="elastic.out(0.5, 0.3)"
              />
            </div>
            <div className="title-line subtitle text-4xl md:text-6xl font-bold text-text-secondary">
              <SplitText 
                text="I build things for the web." 
                splitType="chars"
                isMobile={isMobile}
                delay={30}
                className="block"
                from={{ opacity: 0, y: 50 }}
                to={{ opacity: 1, y: 0 }}
                ease="elastic.out(0.5, 0.3)"
              />
            </div>
          </h1>

          <p className="hero-description text-text-secondary text-lg md:text-xl max-w-2xl mb-12">
            I'm a passionate full-stack developer specializing in building exceptional
            digital experiences. Currently, I'm focused on creating scalable web applications
            and mobile solutions with modern technologies.
          </p>

          <div className="hero-stats flex flex-wrap gap-6 mb-12">
            <div className="stat-card bg-bg-secondary border border-border-color rounded-md p-6 shadow-accent">
              <div className="stat-number text-4xl font-bold text-accent-primary mb-2">5+</div>
              <div className="stat-label font-mono text-text-secondary">Projects Delivered</div>
            </div>
            <div className="stat-card bg-bg-secondary border border-border-color rounded-md p-6 shadow-accent">
              <div className="stat-number text-4xl font-bold text-accent-primary mb-2">2+</div>
              <div className="stat-label font-mono text-text-secondary">Years Experience</div>
            </div>
            <div className="stat-card bg-bg-secondary border border-border-color rounded-md p-6 shadow-accent">
              <div className="stat-number text-4xl font-bold text-accent-primary mb-2">15+</div>
              <div className="stat-label font-mono text-text-secondary">Technologies</div>
            </div>
          </div>

          <div className="hero-cta">
            <a href="#projects" className="btn">
              <span className="btn-text">Check out my work!</span>
              <i className="fas fa-arrow-right btn-icon"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;