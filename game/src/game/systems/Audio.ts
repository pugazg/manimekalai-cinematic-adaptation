// Minimal, original, provenance-safe audio via the Web Audio API. No files, no
// downloads — every sound is synthesised locally at runtime. Audio is never required
// to understand gameplay; it is off until the player starts (autoplay-safe) and can
// be muted. See game/ASSET_PROVENANCE.md.

class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private ambientNode: AudioBufferSourceNode | null = null;
  private muted = false;
  private started = false;

  /** Call from a user gesture (New Game) to satisfy autoplay policies. */
  start(): void {
    if (this.started) {
      void this.ctx?.resume();
      return;
    }
    try {
      const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new Ctx();
      this.master = this.ctx.createGain();
      this.master.gain.value = this.muted ? 0 : 0.5;
      this.master.connect(this.ctx.destination);
      this.started = true;
    } catch {
      this.ctx = null;
    }
  }

  setMuted(m: boolean): void {
    this.muted = m;
    if (this.master && this.ctx) {
      this.master.gain.setTargetAtTime(m ? 0 : 0.5, this.ctx.currentTime, 0.02);
    }
  }

  isMuted(): boolean {
    return this.muted;
  }

  private now(): number {
    return this.ctx ? this.ctx.currentTime : 0;
  }

  private tone(freq: number, dur: number, type: OscillatorType, gain = 0.2, whenOffset = 0): void {
    if (!this.ctx || !this.master || this.muted) return;
    const t = this.now() + whenOffset;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    osc.connect(g);
    g.connect(this.master);
    osc.start(t);
    osc.stop(t + dur + 0.02);
  }

  private noise(dur: number, filterFreq: number, gain = 0.15): void {
    if (!this.ctx || !this.master || this.muted) return;
    const t = this.now();
    const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * dur, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = filterFreq;
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(filter);
    filter.connect(g);
    g.connect(this.master);
    src.start(t);
    src.stop(t + dur);
  }

  footstep(): void { this.noise(0.09, 500, 0.08); }
  water(): void { this.noise(0.5, 900, 0.12); }
  serve(): void { this.tone(420, 0.16, 'sine', 0.18); }
  interact(): void { this.tone(560, 0.09, 'triangle', 0.14); }
  learn(): void { this.tone(660, 0.1, 'sine', 0.14); this.tone(880, 0.12, 'sine', 0.1, 0.09); }

  /** Gentle three-note cue for the ending / போதும் beat. */
  endingCue(): void {
    if (this.muted) return;
    this.tone(392, 0.6, 'sine', 0.16, 0);
    this.tone(523, 0.6, 'sine', 0.14, 0.25);
    this.tone(659, 0.9, 'sine', 0.13, 0.5);
  }

  /** Soft looping crowd/ambience bed for the yard. */
  startAmbience(): void {
    if (!this.ctx || !this.master || this.ambientNode) return;
    const dur = 2;
    const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * dur, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.5;
    const src = this.ctx.createBufferSource();
    src.buffer = buffer;
    src.loop = true;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 320;
    const g = this.ctx.createGain();
    g.gain.value = 0.05;
    src.connect(filter);
    filter.connect(g);
    g.connect(this.master);
    src.start();
    this.ambientNode = src;
  }

  stopAmbience(): void {
    try {
      this.ambientNode?.stop();
    } catch {
      /* already stopped */
    }
    this.ambientNode = null;
  }
}

export const audio = new AudioEngine();
