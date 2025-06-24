export enum HumanString {
  Greeting,
  Farewell,
  Excited,
  Calm,
  Proud,
  Sad,
  Happy,
  Angry,
  Confused,
  Thinking,
  Asking,
  Joking
}

export type Intensity = number;

export interface StringVector {
  str: HumanString;
  intensity: Intensity;
}

export function toVector(str: HumanString, intensity: Intensity): StringVector {
  return { str, intensity };
}
