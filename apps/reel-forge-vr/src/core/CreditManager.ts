export class CreditManager extends EventTarget {
  private _credits = 0;

  add(v:number){
    this._credits += v;
    this.dispatchEvent(new CustomEvent('credit-earned',{detail:v}));
    this.update();
  }

  spend(v:number):boolean{
    if(this._credits>=v){
      this._credits -= v;
      this.dispatchEvent(new CustomEvent('credit-spent',{detail:v}));
      this.update();
      return true;
    }
    return false;
  }

  get value(){ return this._credits; }

  private update(){
    this.dispatchEvent(new CustomEvent('update',{detail:this._credits}));
  }
}
