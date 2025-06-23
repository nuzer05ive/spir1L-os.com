export interface NumberLit  { kind: 'NumberLit'; value: number; }
export interface BreathCall { kind: 'BreathCall'; op: 'in'|'out'|'pause'; arg: number; }
export interface Script     { kind: 'Script'; body: BreathCall[]; }

export type ASTNode = NumberLit | BreathCall | Script;
