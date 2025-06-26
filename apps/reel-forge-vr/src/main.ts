import 'aframe';

document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('theme') as HTMLAudioElement;
  if (audio) audio.play();

  const rig = document.getElementById('cameraRig');
  let start = performance.now();
  const beats = [0, 2, 4, 6, 8];
  let nextBeat = 0;

  function step() {
    const t = (performance.now() - start) / 1000;
    if (rig) {
      rig.setAttribute('position', `0 1.6 ${-t}`);
      if (nextBeat < beats.length && t > beats[nextBeat]) {
        const rot = Math.random() * 360;
        rig.setAttribute('rotation', `0 ${rot} 0`);
        nextBeat++;
      }
    }
    requestAnimationFrame(step);
  }
  step();
});
