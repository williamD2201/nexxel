import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { STUDIO_CONFIG } from '../data/studioConfig';

interface MetricCounterProps {
  target: number;
  suffix: string;
}

const MetricCounter: React.FC<MetricCounterProps> = ({ target, suffix }) => {
  const [count, setCount] = useState<number>(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 1200;
    const incrementTime = 25;
    const step = Math.ceil(target / (duration / incrementTime));

    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-extrabold text-white font-mono tabular-nums">
      {count}
      <span className="text-[#FF69B4]">{suffix}</span>
    </span>
  );
};

export const TrustMetrics: React.FC = () => {
  return (
    <section className="relative py-12 bg-[#032020] border-y border-[#00F0FF]/15 overflow-hidden">
      {/* Background ambient strip glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#069494]/15 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* Discipline Marquee Strip */}
        <div className="flex items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#00F0FF] mb-10 text-center flex-wrap">
          <span>DESIGN</span>
          <span className="text-[#FF69B4]">•</span>
          <span>CODE</span>
          <span className="text-[#FF69B4]">•</span>
          <span>MOTION</span>
          <span className="text-[#FF69B4]">•</span>
          <span>EXPERIMENTATION</span>
        </div>

        {/* 4 Credibility Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {STUDIO_CONFIG.metrics.map((m, idx) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="p-6 rounded-2xl bg-[#042525]/60 border border-white/10 hover:border-[#00F0FF]/30 transition-all duration-300 flex flex-col items-center sm:items-start text-center sm:text-left group"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-1 group-hover:scale-105 transition-transform origin-left">
                <MetricCounter target={m.value} suffix={m.suffix} />
              </div>
              <div className="text-xs sm:text-sm text-white/70 font-medium tracking-wide">
                {m.label}
              </div>
              <div className="w-8 h-[2px] bg-gradient-to-r from-[#00F0FF] to-transparent mt-3 group-hover:w-16 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
