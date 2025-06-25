import { Camera, Vector2, Vector3 } from 'three';
import { FeatherOut } from './FeatherEasing';

export default class MobileFlyControls {
  private joystick = new Vector2();
  private velocity = new Vector3();
  constructor(private camera: Camera, private dom: HTMLElement) {
    this.bind();
  }

  private bind() {
    let active = false;
    this.dom.addEventListener('touchstart', e => {
      if (e.touches.length === 1) {
        active = true;
        this.joystick.set(0, 0);
      }
    });
    this.dom.addEventListener('touchmove', e => {
      if (active && e.touches.length === 1) {
        const touch = e.touches[0];
        this.joystick.x = touch.clientX - touch.screenX;
        this.joystick.y = touch.clientY - touch.screenY;
      }
    });
    this.dom.addEventListener('touchend', () => { active = false; });
  }

  update(dt: number) {
    const mag = this.joystick.length();
    const speed = Math.pow(mag, 1.5); // expo-in curve
    this.velocity.set(this.joystick.x, 0, this.joystick.y).normalize().multiplyScalar(speed);
    const move = this.velocity.clone().multiplyScalar(dt);
    this.camera.translateX(move.x);
    this.camera.translateZ(move.z);
  }
}
