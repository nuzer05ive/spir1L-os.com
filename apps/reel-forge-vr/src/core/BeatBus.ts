export type BeatListener = (beat: number) => void;

export class BeatBus {
  private listeners: BeatListener[] = [];
  private beats = [1,1,3,3,3,5,5,8,8,11,13,31];
  private index = 0;
  start() {
    setInterval(() => {
      const beat = this.beats[this.index % this.beats.length];
      this.listeners.forEach(l => l(beat));
      this.index++;
    }, 1000);
  }
  on(listener: BeatListener) {
    this.listeners.push(listener);
  }
}
