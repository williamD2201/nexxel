// Web Audio API helper for subtle, non-intrusive sound effects (opt-in)
class SoundSystem {
  private ctx: AudioContext | null = null;
  public enabled: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public playTone(freq: number, type: OscillatorType = 'sine', duration: number = 0.3, gainLevel: number = 0.08) {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(gainLevel, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio autoplay policy fallback
    }
  }

  public playIntroChime() {
    if (!this.enabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.8, 0.06);
      }, idx * 120);
    });
  }

  public playBubblePop() {
    if (!this.enabled) return;
    this.playTone(880, 'sine', 0.15, 0.1);
    setTimeout(() => this.playTone(1320, 'sine', 0.2, 0.08), 80);
  }

  public playClick() {
    if (!this.enabled) return;
    this.playTone(600, 'triangle', 0.05, 0.04);
  }
}

export const soundManager = new SoundSystem();
