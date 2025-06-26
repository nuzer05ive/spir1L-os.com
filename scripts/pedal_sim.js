export function initPedalSimulator(el=document.body){
  if(!el) return;
  let rpm=0, timer=null;
  function emit(){
    el.dispatchEvent(new CustomEvent('rpm',{detail:rpm}));
  }
  function start(val){
    rpm=val; emit();
    if(timer) return;
    timer=setInterval(()=>emit(),1000);
  }
  function stop(){
    clearInterval(timer);timer=null;rpm=0;emit();
  }
  el.addEventListener('mousedown',()=>start(60));
  el.addEventListener('mouseup',stop);
  el.addEventListener('mouseleave',stop);
  el.addEventListener('wheel',e=>{
    rpm=Math.max(0, Math.min(120, rpm + (e.deltaY<0?5:-5)));
    emit();
  });
  window.addEventListener('keydown',e=>{ if(e.key==='s') start(60); });
  window.addEventListener('keyup',e=>{ if(e.key==='s') stop(); });
}

// expose for modules loaded via script tag
if (typeof window !== 'undefined') {
  (window as any).initPedalSimulator = initPedalSimulator;
}
