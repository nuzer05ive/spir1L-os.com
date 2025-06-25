import { PerspectiveCamera } from 'three';
import { FeatherOut } from './FeatherEasing';

export default class PinchZoom {
  private startDist = 0;
  private startFov = 75;
  constructor(private camera: PerspectiveCamera, private dom: HTMLElement) {
    this.bind();
  }
  private bind() {
    this.dom.addEventListener('touchstart', e => {
      if (e.touches.length === 2) {
        this.startDist = this.dist(e.touches[0], e.touches[1]);
        this.startFov = this.camera.fov;
      }
    });
    this.dom.addEventListener('touchmove', e => {
      if (e.touches.length === 2) {
        const d = this.dist(e.touches[0], e.touches[1]);
        const delta = (d - this.startDist) / this.startDist;
        const t = Math.max(0, Math.min(1, delta + 0.5));
        const eased = FeatherOut(t);
        this.camera.fov = 30 + eased * 45; // 30-75°
        this.camera.updateProjectionMatrix();
      }
    });
  }
  private dist(a: Touch, b: Touch) {
    const dx = a.clientX - b.clientX;
    const dy = a.clientY - b.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
