let context: AudioContext | null = null;

function getContext() {
  if (typeof window === "undefined" || typeof AudioContext === "undefined")
    return null;
  context ??= new AudioContext();
  return context;
}

function noiseBurst(
  ctx: AudioContext,
  master: GainNode,
  when: number,
  freq: number,
) {
  const length = Math.floor(ctx.sampleRate * 0.07);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) {
    data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 1.6;
  }
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = freq;
  filter.Q.value = 0.85;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.0001, when);
  gain.gain.exponentialRampToValueAtTime(0.45, when + 0.004);
  gain.gain.exponentialRampToValueAtTime(0.0001, when + 0.08);
  noise.connect(filter).connect(gain).connect(master);
  noise.start(when);
}

export async function playClap() {
  const ctx = getContext();
  if (!ctx) return;
  try {
    if (ctx.state === "suspended") await ctx.resume();
    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.value = 0.5;
    master.connect(ctx.destination);
    noiseBurst(ctx, master, now, 1800);
    noiseBurst(ctx, master, now + 0.045, 2200);
    noiseBurst(ctx, master, now + 0.09, 1600);
  } catch {
    // Sound is decorative.
  }
}

export async function playLove() {
  const ctx = getContext();
  if (!ctx) return;
  try {
    if (ctx.state === "suspended") await ctx.resume();
    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.value = 0.28;
    master.connect(ctx.destination);

    const notes = [
      { freq: 523.25, at: 0, dur: 0.18 },
      { freq: 659.25, at: 0.09, dur: 0.28 },
    ];
    for (const note of notes) {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.value = note.freq;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.0001, now + note.at);
      gain.gain.exponentialRampToValueAtTime(0.7, now + note.at + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + note.at + note.dur);
      osc.connect(gain).connect(master);
      osc.start(now + note.at);
      osc.stop(now + note.at + note.dur + 0.02);
    }
  } catch {
    // Sound is decorative.
  }
}
