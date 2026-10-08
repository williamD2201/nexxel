import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, RotateCcw, Sparkles, Sliders, Volume2, Activity, Box, Zap } from 'lucide-react';
import { soundManager } from '../utils/audio';

type LabTab = 'geometry' | 'synth' | 'particles';

export const CreativeLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<LabTab>('geometry');

  // Geometry Lab State
  const [shape, setShape] = useState<'orb' | 'torus' | 'octahedron'>('torus');
  const [wireframe, setWireframe] = useState<boolean>(true);
  const [rotationSpeed, setRotationSpeed] = useState<number>(1);

  // Synth Lab State
  const synthCanvasRef = useRef<HTMLCanvasElement>(null);
  const [activeNote, setActiveNote] = useState<string | null>(null);

  // Particle Canvas State
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  const [particleMode, setParticleMode] = useState<'attract' | 'repel'>('attract');

  // 1. Synth Oscilloscope Animation
  useEffect(() => {
    if (activeTab !== 'synth') return;
    const canvas = synthCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let phase = 0;

    const render = () => {
      animId = requestAnimationFrame(render);
      phase += 0.05;

      ctx.fillStyle = '#021818';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Grid background lines
      ctx.strokeStyle = 'rgba(6, 148, 148, 0.15)';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw primary glowing pink waveform
      ctx.beginPath();
      ctx.strokeStyle = '#FF69B4';
      ctx.lineWidth = 2.5;
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#FF69B4';

      const amplitude = activeNote ? 48 : 20;
      const freq = activeNote ? 0.04 : 0.02;

      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.sin(x * freq + phase) * amplitude * Math.sin(phase * 0.5 + x * 0.01);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Secondary glowing cyan harmonic
      ctx.beginPath();
      ctx.strokeStyle = '#00F0FF';
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#00F0FF';

      for (let x = 0; x < canvas.width; x++) {
        const y = canvas.height / 2 + Math.cos(x * (freq * 1.5) - phase) * (amplitude * 0.6);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [activeTab, activeNote]);

  // 2. Interactive Particle Field
  useEffect(() => {
    if (activeTab !== 'particles') return;
    const canvas = particleCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const numParticles = 80;
    const particles = Array.from({ length: numParticles }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: Math.random() * 2 + 1.5,
      color: Math.random() > 0.5 ? '#00F0FF' : '#FF69B4',
    }));

    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
      mouseY = (e.clientY - rect.top) * (canvas.height / rect.height);
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.fillStyle = 'rgba(2, 24, 24, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        // Force calculation toward or away from mouse
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150 && dist > 5) {
          const force = (150 - dist) / 150;
          const direction = particleMode === 'attract' ? 1 : -1;
          p.vx += (dx / dist) * force * 0.4 * direction;
          p.vy += (dy / dist) * force * 0.4 * direction;
        }

        // Apply friction & boundary wrap
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Render Particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [activeTab, particleMode]);

  // Notes configuration for synth
  const notes = [
    { label: 'C4', freq: 261.63 },
    { label: 'D4', freq: 293.66 },
    { label: 'E4', freq: 329.63 },
    { label: 'F4', freq: 349.23 },
    { label: 'G4', freq: 392.0 },
    { label: 'A4', freq: 440.0 },
    { label: 'B4', freq: 493.88 },
    { label: 'C5', freq: 523.25 },
  ];

  const handlePlayKey = (label: string, freq: number) => {
    soundManager.enabled = true;
    soundManager.playTone(freq, 'sawtooth', 0.4, 0.12);
    setActiveNote(label);
    setTimeout(() => setActiveNote(null), 300);
  };

  return (
    <section id="lab" className="relative py-24 sm:py-32 bg-[#021414] border-t border-[#00F0FF]/15 overflow-hidden">
      {/* Background radial atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 w-[600px] h-[600px] bg-[#00F0FF]/10 blur-[160px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#00F0FF] uppercase mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF69B4]" />
              <span>EXPERIMENTAL WORKBENCH</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              CREATIVE LAB
            </h2>
          </div>

          <p className="text-sm sm:text-base text-white/70 max-w-md font-normal">
            Real-time sensory prototypes, generative audio visualizers, and interactive physics sandboxes built during studio R&D sessions.
          </p>
        </div>

        {/* Experiment Navigation Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-[#042828] border border-white/10 rounded-full max-w-fit mb-8">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('geometry');
            }}
            className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'geometry'
                ? 'bg-gradient-to-r from-[#FF69B4] to-[#069494] text-white shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Box size={14} />
            <span>3D GEOMETRY SHIFTER</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('synth');
            }}
            className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'synth'
                ? 'bg-gradient-to-r from-[#FF69B4] to-[#069494] text-white shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Activity size={14} />
            <span>AUDIO OSCILLOSCOPE</span>
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('particles');
            }}
            className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider flex items-center gap-2 cursor-pointer transition-all ${
              activeTab === 'particles'
                ? 'bg-gradient-to-r from-[#FF69B4] to-[#069494] text-white shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Sparkles size={14} />
            <span>PHYSICS PARTICLE FIELD</span>
          </button>
        </div>

        {/* Experiment Display Container */}
        <div className="rounded-3xl bg-[#032323] border border-[#00F0FF]/30 p-6 sm:p-10 shadow-[0_0_50px_rgba(2,24,24,0.9)]">
          {/* TAB 1: 3D Geometry Shifter */}
          {activeTab === 'geometry' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 relative aspect-[16/10] sm:aspect-[2/1] rounded-2xl bg-[#021818] border border-white/10 flex items-center justify-center overflow-hidden">
                {/* 3D Geometric Visual Mockup with CSS 3D */}
                <div
                  className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center"
                  style={{
                    perspective: '800px',
                  }}
                >
                  <motion.div
                    animate={{
                      rotateX: [0, 360],
                      rotateY: [0, 360],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 16 / rotationSpeed,
                      ease: 'linear',
                    }}
                    className={`relative w-36 h-36 border-2 transition-all duration-500 flex items-center justify-center ${
                      shape === 'orb'
                        ? 'rounded-full border-[#FF69B4] shadow-[0_0_35px_rgba(255,105,180,0.5)]'
                        : shape === 'torus'
                        ? 'rounded-[30%] border-[#00F0FF] shadow-[0_0_35px_rgba(0,240,255,0.5)]'
                        : 'rotate-45 border-white shadow-[0_0_35px_rgba(6,148,148,0.5)]'
                    } ${wireframe ? 'border-dashed' : 'border-solid bg-gradient-to-tr from-[#069494]/30 to-[#FF69B4]/30 backdrop-blur-sm'}`}
                  >
                    <div className="w-16 h-16 rounded-full border border-white/40 bg-gradient-to-tr from-[#FF69B4] to-[#00F0FF] animate-pulse" />
                  </motion.div>
                </div>

                <div className="absolute top-4 left-4 text-[11px] font-mono text-[#00F0FF]">
                  GEOMETRY MESH: {shape.toUpperCase()}
                </div>
              </div>

              {/* Controls Panel */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                <div>
                  <label className="text-xs font-mono text-white/50 uppercase block mb-2">
                    SELECT GEOMETRY
                  </label>
                  <div className="flex gap-2">
                    {(['orb', 'torus', 'octahedron'] as const).map(s => (
                      <button
                        key={s}
                        onClick={() => setShape(s)}
                        className={`flex-1 py-2 text-xs font-bold uppercase rounded-xl border transition-all cursor-pointer ${
                          shape === s
                            ? 'bg-[#00F0FF]/20 border-[#00F0FF] text-[#00F0FF]'
                            : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono text-white/50 uppercase block mb-2">
                    SURFACE MATERIAL
                  </label>
                  <button
                    onClick={() => setWireframe(!wireframe)}
                    className="w-full py-2.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-bold uppercase tracking-wider text-white transition-colors cursor-pointer"
                  >
                    MODE: {wireframe ? 'WIREFRAME GLSL' : 'PHYSICAL GLASS'}
                  </button>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono text-white/50 uppercase mb-2">
                    <span>ROTATION VELOCITY</span>
                    <span className="text-[#FF69B4]">{rotationSpeed}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="3"
                    step="0.1"
                    value={rotationSpeed}
                    onChange={e => setRotationSpeed(parseFloat(e.target.value))}
                    className="w-full accent-[#FF69B4] cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Audio Oscilloscope & Synthesizer */}
          {activeTab === 'synth' && (
            <div className="flex flex-col gap-6">
              {/* Oscilloscope Canvas */}
              <div className="relative aspect-[21/9] w-full rounded-2xl bg-[#021818] border border-white/10 overflow-hidden flex items-center justify-center">
                <canvas
                  ref={synthCanvasRef}
                  width={800}
                  height={320}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 text-[11px] font-mono text-[#FF69B4] flex items-center gap-2">
                  <Activity size={14} className="animate-pulse" />
                  <span>LIVE DSP HARMONICS · WEB AUDIO ENGINE</span>
                </div>
              </div>

              {/* Synthesizer Keypads */}
              <div>
                <div className="text-xs font-mono text-white/50 uppercase mb-3 flex items-center gap-2">
                  <Volume2 size={13} className="text-[#00F0FF]" />
                  <span>TRIGGER SYNTHESIS PADS (CLICK TO HEAR)</span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
                  {notes.map(note => {
                    const isPressed = activeNote === note.label;
                    return (
                      <button
                        key={note.label}
                        onClick={() => handlePlayKey(note.label, note.freq)}
                        className={`py-6 rounded-2xl font-mono text-sm font-bold flex flex-col items-center justify-center transition-all cursor-pointer ${
                          isPressed
                            ? 'bg-[#FF69B4] text-white scale-95 shadow-[0_0_25px_#FF69B4]'
                            : 'bg-[#042828] hover:bg-[#069494]/30 border border-white/10 text-white hover:border-[#00F0FF]'
                        }`}
                      >
                        <span className="text-lg">{note.label}</span>
                        <span className="text-[10px] text-white/50 mt-1">{Math.round(note.freq)}Hz</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Physics Particle Field */}
          {activeTab === 'particles' && (
            <div className="flex flex-col gap-6">
              <div className="relative aspect-[21/9] w-full rounded-2xl bg-[#021818] border border-white/10 overflow-hidden flex items-center justify-center">
                <canvas
                  ref={particleCanvasRef}
                  width={800}
                  height={360}
                  className="w-full h-full object-cover cursor-crosshair"
                />
                <div className="absolute top-4 left-4 text-[11px] font-mono text-[#00F0FF] flex items-center gap-2 pointer-events-none">
                  <Sparkles size={14} />
                  <span>HOVER TO DISTORT PARTICLE VORTEX</span>
                </div>
              </div>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-white/50 uppercase">FORCE MODE:</span>
                  <button
                    onClick={() => setParticleMode('attract')}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all cursor-pointer ${
                      particleMode === 'attract'
                        ? 'bg-[#00F0FF] text-[#021818]'
                        : 'bg-white/5 border border-white/10 text-white/70'
                    }`}
                  >
                    GRAVITATIONAL ATTRACT
                  </button>
                  <button
                    onClick={() => setParticleMode('repel')}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase transition-all cursor-pointer ${
                      particleMode === 'repel'
                        ? 'bg-[#FF69B4] text-white'
                        : 'bg-white/5 border border-white/10 text-white/70'
                    }`}
                  >
                    FORCE REPULSION
                  </button>
                </div>

                <div className="text-xs font-mono text-white/40">
                  REAL-TIME VECTOR SIMULATION · 60 FPS
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
