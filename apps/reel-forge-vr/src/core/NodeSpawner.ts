import { CreditManager } from './CreditManager';

const COSTS = { gptNode:5, meshChunk:3, shaderPass:1 } as const;
export type SpawnType = keyof typeof COSTS;

export class NodeSpawner {
  constructor(private credits:CreditManager){}

  request(type:SpawnType){
    const cost=COSTS[type];
    if(this.credits.spend(cost)){
      console.log('spawn',type);
    }else{
      console.log('Pedal to bloom further!');
    }
  }
}
