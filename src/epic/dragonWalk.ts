export function dragonWalk(n: number): { residue: number; helix: number }[] {
  return Array.from({ length: n }, (_, i) => ({ residue: i % 7, helix: i % 5 }));
}
