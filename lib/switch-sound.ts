let context: AudioContext | null = null;

function getContext() {
  if (typeof window === "undefined" || typeof AudioContext === "undefined")
    return null;
  context ??= new AudioContext();
  return context;
}

export async function playSwitchClick(direction: "on" | "off" = "on") {
  const ctx = getContext();
  if (!ctx) return;
  try {
    if (ctx.state === "suspended") await ctx.resume();
    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.value = 0.55;
    master.connect(ctx.destination);

    // Transient: a fast pitch drop reads as the switch snapping over.
    const snap = ctx.createOscillator();
    snap.type = "triangle";
    const snapStart = direction === "on" ? 2600 : 1900;
    snap.frequency.setValueAtTime(snapStart, now);
    snap.frequency.exponentialRampToValueAtTime(420, now + 0.028);
    const snapGain = ctx.createGain();
    snapGain.gain.setValueAtTime(0.5, now);
    snapGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);
    snap.connect(snapGain).connect(master);
    snap.start(now);
    snap.stop(now + 0.035);

    // Noise burst: the mechanical rattle of the rocker.
    const length = Math.floor(ctx.sampleRate * 0.045);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** 2;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = direction === "on" ? 3200 : 2400;
    filter.Q.value = 0.9;
    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(0.35, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
    noise.connect(filter).connect(noiseGain).connect(master);
    noise.start(now);

    // Thud: the body of the switch settling.
    const thud = ctx.createOscillator();
    thud.type = "sine";
    thud.frequency.setValueAtTime(direction === "on" ? 190 : 150, now + 0.004);
    thud.frequency.exponentialRampToValueAtTime(70, now + 0.09);
    const thudGain = ctx.createGain();
    thudGain.gain.setValueAtTime(0.0001, now);
    thudGain.gain.exponentialRampToValueAtTime(0.6, now + 0.006);
    thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
    thud.connect(thudGain).connect(master);
    thud.start(now);
    thud.stop(now + 0.11);
  } catch {
    // Audio is a flourish; never let it interrupt the theme change.
  }
}
