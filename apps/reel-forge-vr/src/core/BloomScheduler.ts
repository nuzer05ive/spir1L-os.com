import { BeatBus } from './BeatBus';

export class BloomScheduler {
  constructor(private bus: BeatBus) {}

  start() {
    this.bus.on((beat) => {
      console.log('Bloom effect at beat', beat);
    });
  }
}
