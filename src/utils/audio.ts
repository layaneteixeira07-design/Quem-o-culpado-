/**
 * Audio synthesis service using Web Audio API
 * Provides high-fidelity sound effects without any external network dependencies
 */

class SoundEffectsManager {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private hapticsEnabled: boolean = true;

  constructor() {
    // AudioContext will be initialized on first user gesture
    if (typeof window !== 'undefined') {
      const savedSound = localStorage.getItem('qc_sound_enabled');
      if (savedSound !== null) {
        this.soundEnabled = savedSound === 'true';
      }
      const savedHaptics = localStorage.getItem('qc_haptics_enabled');
      if (savedHaptics !== null) {
        this.hapticsEnabled = savedHaptics === 'true';
      }
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public setSoundEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    localStorage.setItem('qc_sound_enabled', String(enabled));
  }

  public isSoundEnabled(): boolean {
    return this.soundEnabled;
  }

  public setHapticsEnabled(enabled: boolean) {
    this.hapticsEnabled = enabled;
    localStorage.setItem('qc_haptics_enabled', String(enabled));
  }

  public isHapticsEnabled(): boolean {
    return this.hapticsEnabled;
  }

  private triggerHaptic(type: 'light' | 'medium' | 'heavy' | 'success' | 'error') {
    if (!this.hapticsEnabled || typeof navigator === 'undefined' || !navigator.vibrate) {
      return;
    }
    try {
      if (type === 'light') navigator.vibrate(10);
      else if (type === 'medium') navigator.vibrate(25);
      else if (type === 'heavy') navigator.vibrate(50);
      else if (type === 'success') navigator.vibrate([30, 50, 60]);
      else if (type === 'error') navigator.vibrate([50, 40, 70, 40, 100]);
    } catch {
      // Ignore vibration errors if not supported or restricted
    }
  }

  /**
   * Subtle button click / interaction sound
   */
  public playClick() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;
    this.triggerHaptic('light');

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.05);
  }

  /**
   * Clue discovered sound - Mysterious chime
   */
  public playClueFound() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;
    this.triggerHaptic('medium');

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = now + idx * 0.08;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.18, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.6);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.6);
    });
  }

  /**
   * Sound when pinning evidence to the board / connecting thread
   */
  public playPin() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;
    this.triggerHaptic('light');

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.08);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  /**
   * Dramatic contradiction detected sound (gavel or suspense chord)
   */
  public playContradiction() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;
    this.triggerHaptic('heavy');

    const now = this.ctx.currentTime;
    // Suspense tritone
    const freqs = [311.13, 440.0, 622.25]; // Eb4, A4, Eb5

    freqs.forEach((f) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, now);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    });
  }

  /**
   * Error or false accusation sound
   */
  public playError() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;
    this.triggerHaptic('error');

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.linearRampToValueAtTime(140, now + 0.35);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  /**
   * Success / Victory sound - Noir Triumph fanfare
   */
  public playVictory() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;
    this.triggerHaptic('success');

    const now = this.ctx.currentTime;
    const chords = [
      { freqs: [392.00, 493.88, 587.33], time: 0 },    // G major
      { freqs: [440.00, 554.37, 659.25], time: 0.18 }, // A major
      { freqs: [523.25, 659.25, 783.99], time: 0.36 }, // C major
      { freqs: [587.33, 739.99, 880.00, 1174.66], time: 0.58, dur: 1.2 } // D major octave
    ];

    chords.forEach((chord) => {
      const dur = chord.dur || 0.25;
      chord.freqs.forEach((freq) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const startTime = now + chord.time;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.linearRampToValueAtTime(0.12, startTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + dur);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + dur);
      });
    });
  }

  /**
   * Interrogation question asked sound - subtle typewriter tick
   */
  public playTypewriter() {
    if (!this.soundEnabled) return;
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(1400 + Math.random() * 300, now);

    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.025);
  }
}

export const soundManager = new SoundEffectsManager();
