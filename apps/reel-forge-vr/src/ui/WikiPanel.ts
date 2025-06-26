import 'aframe';

declare const AFRAME: any;

export function registerWikiPanel(){
  AFRAME.registerComponent('wiki-panel', {
    schema: { page: { type: 'string', default: '00_index' } },
    init: function(){
      const bg = document.createElement('a-plane');
      bg.setAttribute('color', '#222');
      bg.setAttribute('width', 1);
      bg.setAttribute('height', 1);
      this.el.appendChild(bg);

      const text = document.createElement('a-text');
      text.setAttribute('color', '#fff');
      text.setAttribute('width', 0.9);
      text.setAttribute('align', 'left');
      text.setAttribute('position', '-0.45 0.45 0.01');
      bg.appendChild(text);
      this.textEl = text;
      this.loadPage(this.data.page);
    },
    loadPage: function(name: string){
      fetch(`/docs/design-bible/${name}.md`).then(r => r.text()).then(t => {
        this.textEl.setAttribute('value', t);
      }).catch(() => {
        this.textEl.setAttribute('value', '(page missing)');
      });
    }
  });
}
