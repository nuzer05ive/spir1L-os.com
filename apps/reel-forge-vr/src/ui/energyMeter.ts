import { CreditManager } from '../core/CreditManager';
import 'aframe';

declare const AFRAME:any;

export function registerEnergyMeter(manager:CreditManager){
  AFRAME.registerComponent('energy-meter',{
    schema:{max:{type:'int',default:100}},
    init:function(){
      const bar=document.createElement('a-plane');
      bar.setAttribute('color','#00ff99');
      bar.setAttribute('width',0.1);
      bar.setAttribute('height',1);
      this.el.appendChild(bar);
      manager.addEventListener('update',(e:Event)=>{
        const val=(e as CustomEvent<number>).detail;
        const fill=Math.min(1,val/this.data.max);
        bar.setAttribute('scale',`1 ${fill} 1`);
      });
    }
  });
}
