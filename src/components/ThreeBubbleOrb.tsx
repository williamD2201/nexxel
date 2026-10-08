import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ThreeBubbleOrbProps {
  interactive?: boolean;
  className?: string;
  size?: 'normal' | 'hero' | 'small';
}

export const ThreeBubbleOrb: React.FC<ThreeBubbleOrbProps> = ({
  interactive = true,
  className = '',
  size = 'hero',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState<boolean>(true);
  const [isLowPower, setIsLowPower] = useState<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect mobile or low power to throttle complexity
    const isMobileDevice = window.innerWidth < 768;
    setIsLowPower(isMobileDevice);

    // Test WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    // Three.js Scene Setup
    const scene = new THREE.Scene();

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = size === 'hero' ? 4.8 : 3.8;

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      setHasWebGL(false);
    };

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobileDevice,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobileDevice ? 1.5 : 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      // Prevent premature shader validate checks that cause 1282 GL_INVALID_OPERATION in ANGLE/Chromium
      renderer.debug.checkShaderErrors = false;

      renderer.domElement.addEventListener('webglcontextlost', handleContextLost, false);

      container.appendChild(renderer.domElement);
    } catch {
      setHasWebGL(false);
      return;
    }

    // Lighting (Studio Three-Point with Pink and Cyan)
    // Key Light (Electric Cyan)
    const cyanLight = new THREE.DirectionalLight(0x00F0FF, 3.2);
    cyanLight.position.set(4, 5, 4);
    scene.add(cyanLight);

    // Rim/Accent Light (Bubblegum Pink)
    const pinkLight = new THREE.DirectionalLight(0xFF69B4, 4.0);
    pinkLight.position.set(-4, -3, 3);
    scene.add(pinkLight);

    // Deep Teal Fill Light
    const tealLight = new THREE.PointLight(0x069494, 2.5, 20);
    tealLight.position.set(0, -4, -3);
    scene.add(tealLight);

    // Soft Ambient
    const ambientLight = new THREE.AmbientLight(0x021818, 1.2);
    scene.add(ambientLight);

    // Group to hold everything
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Outer Glass Sphere
    const sphereSegments = isMobileDevice ? 32 : 64;
    const outerGeo = new THREE.SphereGeometry(1.4, sphereSegments, sphereSegments);
    const outerMat = new THREE.MeshPhongMaterial({
      color: 0xFFFFFF,
      emissive: 0x069494,
      emissiveIntensity: 0.15,
      specular: 0x00F0FF,
      shininess: 90,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const outerSphere = new THREE.Mesh(outerGeo, outerMat);
    mainGroup.add(outerSphere);

    // 2. Inner Glowing Core: Abstract Geometric Form (Torus Knot + Icosahedron)
    const innerKnotGeo = new THREE.TorusKnotGeometry(0.65, 0.22, isMobileDevice ? 48 : 80, 16, 2, 3);
    const innerKnotMat = new THREE.MeshPhongMaterial({
      color: 0xFF69B4,
      emissive: 0x069494,
      emissiveIntensity: 0.45,
      specular: 0xFFFFFF,
      shininess: 80,
    });
    const innerKnot = new THREE.Mesh(innerKnotGeo, innerKnotMat);
    mainGroup.add(innerKnot);

    // 3. Floating Orbit Rings (Cyan & Pink)
    const ringGeo = new THREE.TorusGeometry(1.8, 0.02, 16, isMobileDevice ? 48 : 96);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00F0FF,
      transparent: true,
      opacity: 0.6,
    });
    const orbitRing1 = new THREE.Mesh(ringGeo, ringMat);
    orbitRing1.rotation.x = Math.PI / 3;
    mainGroup.add(orbitRing1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xFF69B4,
      transparent: true,
      opacity: 0.5,
    });
    const orbitRing2 = new THREE.Mesh(ringGeo, ringMat2);
    orbitRing2.rotation.y = Math.PI / 4;
    orbitRing2.rotation.x = -Math.PI / 6;
    mainGroup.add(orbitRing2);

    // 4. Floating ambient particles inside/around the orb
    const particleCount = isMobileDevice ? 25 : 60;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorCyan = new THREE.Color(0x00F0FF);
    const colorPink = new THREE.Color(0xFF69B4);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.0 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = Math.random() > 0.5 ? colorCyan : colorPink;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.05,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    mainGroup.add(particles);

    // Interactive mouse tracking
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.8;
      targetY = y * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth lerp toward mouse target
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      // Group rotation and gentle floating wobble
      mainGroup.rotation.y = elapsedTime * 0.25 + currentX;
      mainGroup.rotation.x = Math.sin(elapsedTime * 0.4) * 0.15 - currentY * 0.8;
      mainGroup.position.y = Math.sin(elapsedTime * 1.2) * 0.12;

      // Inner knot independent rotation
      innerKnot.rotation.x = elapsedTime * 0.5;
      innerKnot.rotation.y = elapsedTime * 0.7;

      // Orbit rings spin
      orbitRing1.rotation.z = elapsedTime * 0.3;
      orbitRing2.rotation.z = -elapsedTime * 0.35;

      // Particles slow drift
      particles.rotation.y = -elapsedTime * 0.15;

      // Outer glass subtle pulse
      const pulse = 1.0 + Math.sin(elapsedTime * 2.0) * 0.015;
      outerSphere.scale.set(pulse, pulse, pulse);

      try {
        renderer.render(scene, camera);
      } catch {
        setHasWebGL(false);
        cancelAnimationFrame(animationFrameId);
        return;
      }
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (renderer && renderer.domElement) {
        renderer.domElement.removeEventListener('webglcontextlost', handleContextLost);
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
        renderer.dispose();
      }
      outerGeo.dispose();
      outerMat.dispose();
      innerKnotGeo.dispose();
      innerKnotMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ringMat2.dispose();
      particleGeo.dispose();
      particleMat.dispose();
    };
  }, [interactive, size]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[300px] flex items-center justify-center pointer-events-none select-none ${className}`}
      aria-label="Interactive 3D Bubblegum Pop Glass Orb"
    >
      {/* Graceful Fallback if WebGL is unavailable */}
      {!hasWebGL && (
        <div className="relative w-72 h-72 rounded-full bg-radial from-[#00F0FF]/30 via-[#FF69B4]/25 to-[#069494]/20 border border-[#00F0FF]/40 backdrop-blur-xl flex items-center justify-center shadow-[0_0_50px_rgba(255,105,180,0.3)] animate-pulse">
          <div className="w-36 h-36 rounded-full border border-white/40 bg-gradient-to-tr from-[#FF69B4] to-[#00F0FF] opacity-80" />
        </div>
      )}
    </div>
  );
};
