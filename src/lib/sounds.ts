/**
 * sounds.ts — Web Audio API sound effects. Zero files, zero loading.
 *
 * AudioContext is lazy-initialized on first call (requires prior user gesture).
 * All sounds are generated procedurally: oscillators + noise bursts.
 *
 * Master volume: MASTER constant below.
 */

const MASTER = 0.55; // global multiplier — lower if too loud

let _ctx: AudioContext | null = null;

function ctx(): AudioContext {
  if (!_ctx) {
    _ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  if (_ctx.state === "suspended") void _ctx.resume();
  return _ctx;
}

// ── Primitive builders ────────────────────────────────────────────────────────

function tone(
  freq: number,
  duration: number,
  vol: number,
  delay = 0,
  type: OscillatorType = "sine",
): void {
  const c = ctx();
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  osc.connect(gain);
  gain.connect(c.destination);
  const t = c.currentTime + delay;
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(vol * MASTER, t + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.start(t);
  osc.stop(t + duration + 0.01);
}

function noise(duration: number, vol: number, hipass = 2000, delay = 0): void {
  const c = ctx();
  const bufSize = Math.ceil(c.sampleRate * duration);
  const buf = c.createBuffer(1, bufSize, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;

  const src = c.createBufferSource();
  src.buffer = buf;

  const filt = c.createBiquadFilter();
  filt.type = "highpass";
  filt.frequency.value = hipass;

  const gain = c.createGain();
  const t = c.currentTime + delay;
  gain.gain.setValueAtTime(vol * MASTER, t);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

  src.connect(filt);
  filt.connect(gain);
  gain.connect(c.destination);
  src.start(t);
}

// ── Named sounds ──────────────────────────────────────────────────────────────

export const sounds = {
  /**
   * UI click — crisp mechanical press.
   * Short noise burst + square wave tick.
   */
  click(): void {
    noise(0.018, 0.18, 3200);
    tone(640, 0.028, 0.07, 0, "square");
  },

  /**
   * Keyboard keypress — typewriter-style clack.
   * Slightly higher and sharper than a regular click.
   */
  keypress(): void {
    noise(0.016, 0.22, 4000);
    tone(900, 0.022, 0.05, 0, "square");
  },

  /**
   * Message sent — quick ascending double-tone (satisfying "whoosh").
   */
  messageSend(): void {
    tone(480, 0.09, 0.1,  0,    "sine");
    tone(720, 0.07, 0.08, 0.045, "sine");
  },

  /**
   * Message received — soft chime, two rising tones.
   */
  messageReceive(): void {
    tone(880,  0.22, 0.07, 0,    "sine");
    tone(1100, 0.18, 0.05, 0.07, "sine");
  },

  /**
   * Terminal line appears — quick matrix-style type tick.
   */
  terminalType(): void {
    noise(0.014, 0.09, 5000);
    tone(1100, 0.014, 0.03, 0, "square");
  },

  /**
   * OS mode dock entry — subtle power-on shimmer.
   */
  osEnter(): void {
    [300, 500, 750, 1000].forEach((f, i) => tone(f, 0.12, 0.04, i * 0.055, "sine"));
  },
};
