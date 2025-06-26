import 'aframe';
import { registerWikiPanel } from './WikiPanel';

declare const AFRAME: any;

const isDev = (import.meta as any).env.SPIRAL_ENV === 'dev';

export function registerAdminTablet(){
  if(!isDev) return;
  registerWikiPanel();
  AFRAME.registerComponent('admin-tablet', {
    init: function(){
      const panel = document.createElement('a-entity');
      panel.setAttribute('visible', 'false');
      panel.setAttribute('position', '0 1 -1');
      panel.setAttribute('rotation', '-20 0 0');
      panel.setAttribute('wiki-panel', 'page:00_index');
      this.el.appendChild(panel);
      this.panel = panel;

      const btn = document.createElement('a-plane');
      btn.setAttribute('color', '#4477ff');
      btn.setAttribute('width', 0.6);
      btn.setAttribute('height', 0.2);
      btn.setAttribute('position', '0 -0.6 0.05');
      btn.setAttribute('text', 'value: RUN CODEX NOW; align:center; color:#fff;');
      panel.appendChild(btn);

      btn.addEventListener('click', () => this.runCodex());

      const toggle = () => {
        const v = panel.getAttribute('visible');
        panel.setAttribute('visible', !v);
      };

      document.addEventListener('keydown', (e) => {
        if(e.shiftKey && e.code === 'KeyC') toggle();
      });
      let hold: any = null;
      this.el.sceneEl?.addEventListener('abuttondown', (ev: any) => {
        if(ev.detail?.hand === 'left'){
          hold = setTimeout(toggle, 1000);
        }
      });
      this.el.sceneEl?.addEventListener('abuttonup', (ev: any) => {
        if(ev.detail?.hand === 'left' && hold){
          clearTimeout(hold); hold = null;
        }
      });
    },
    runCodex: function(){
      fetch('/api/run-codex', { method: 'POST' }).catch(() => {
        const toast = document.createElement('a-text');
        toast.setAttribute('value', 'Codex disabled');
        toast.setAttribute('color', '#f55');
        toast.setAttribute('position', '0 2 -1');
        this.el.sceneEl?.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
      });
    }
  });
}
