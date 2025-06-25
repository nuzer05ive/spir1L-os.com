import 'aframe';
import MobileFlyControls from './controls/MobileFlyControls';

AFRAME.registerComponent('spir1l-mobile-controls', {
  init() {
    this.controls = new MobileFlyControls(this.el.sceneEl.camera, this.el.sceneEl.canvas);
  },
  tick(_time: number, dt: number) {
    this.controls.update(dt / 1000);
  }
});
