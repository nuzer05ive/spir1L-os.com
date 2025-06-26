import 'aframe';
import { BeatBus } from './core/BeatBus';
import { AnimeRail } from './core/AnimeRail';
import { BloomScheduler } from './core/BloomScheduler';
import toonFrag from './shaders/toon.glsl?raw';
import rimFrag from './shaders/rimLight.glsl?raw';

declare const AFRAME: any;

AFRAME.registerShader('toon', {
  schema: {
    lightDirection: {type: 'vec3', default: {x: 0, y: 1, z: 1}},
    baseColor: {type: 'color', default: '#FFF'}
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    void main() {
      vec4 mv = modelViewMatrix * vec4(position,1.0);
      vNormal = normalMatrix * normal;
      vViewPosition = -mv.xyz;
      gl_Position = projectionMatrix * mv;
    }
  `,
  fragmentShader: toonFrag
});

AFRAME.registerShader('rim-light', {
  schema: {
    baseColor: {type: 'color', default: '#FFF'},
    rimColor: {type: 'color', default: '#FFF'},
    rimPower: {type: 'number', default: 2}
  },
  vertexShader: `
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    void main() {
      vec4 mv = modelViewMatrix * vec4(position,1.0);
      vNormal = normalMatrix * normal;
      vViewPosition = -mv.xyz;
      gl_Position = projectionMatrix * mv;
    }
  `,
  fragmentShader: rimFrag
});

AFRAME.registerComponent('follow-camera', {
  tick: function(){
    const cam = document.getElementById('cameraRig');
    if(cam){
      this.el.object3D.position.copy(cam.object3D.position);
    }
  }
});

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
