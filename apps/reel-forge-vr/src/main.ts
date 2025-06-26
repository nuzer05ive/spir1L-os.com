import 'aframe';
import { BeatBus } from './core/BeatBus';
import { AnimeRail } from './core/AnimeRail';
import { BloomScheduler } from './core/BloomScheduler';

document.addEventListener('DOMContentLoaded', () => {
  const audio = document.getElementById('theme') as HTMLAudioElement;
  if (audio) audio.play();

  const bus = new BeatBus();
  const rail = new AnimeRail(bus);
  const bloom = new BloomScheduler(bus);
  rail.start();
  bloom.start();
  bus.start();
});
