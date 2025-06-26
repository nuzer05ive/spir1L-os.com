self.onmessage = () => {
  // placeholder GPT node worker
  self.postMessage({ text: 'haiku' });
};
export {};
