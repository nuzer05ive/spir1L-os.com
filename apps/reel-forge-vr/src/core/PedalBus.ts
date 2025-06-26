import { CreditManager } from './CreditManager';

export type RpmListener = (rpm:number)=>void;

export class PedalBus {
  private listeners:RpmListener[]=[];
  private phiTilt = 1.61803398875 * (1 + 0.000437);

  constructor(private credits:CreditManager){
    const el=document.querySelector('[pedal-simulator]')||document.body;
    el.addEventListener('rpm',(e:Event)=>{
      const rpm=(e as CustomEvent<number>).detail||0;
      this.handle(rpm);
    });
    // placeholder for real sensor hookup
  }

  private handle(rpm:number){
    this.emit(rpm);
    const energy=Math.ceil(Math.pow(this.phiTilt, rpm/30));
    if(energy>0) this.credits.add(energy);
  }

  private emit(rpm:number){
    this.listeners.forEach(l=>l(rpm));
  }

  on(l:RpmListener){
    this.listeners.push(l);
  }
}
