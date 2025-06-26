import { BeatBus } from './BeatBus';

export class AnimeRail {
  constructor(private bus: BeatBus) {}

  start() {
    this.bus.on(() => {
      // camera animation placeholder
    });
  }
}
