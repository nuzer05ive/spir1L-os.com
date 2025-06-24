import { HumanString } from '../content/strings';
import { dragonWalk } from './dragonWalk';

export interface EpisodePlan {
  ep: number;
  primaryString: HumanString;
  humorMod: number;
  residue: number;
  helix: number;
}

export function planSeason(n = 221): EpisodePlan[] {
  const walk = dragonWalk(n);
  const strings = Object.values(HumanString).filter((v) => typeof v === 'number') as unknown as HumanString[];
  return walk.map((w, i) => ({
    ep: i + 1,
    primaryString: strings[i % strings.length],
    humorMod: i % 3,
    residue: w.residue,
    helix: w.helix,
  }));
}

if (require.main === module) {
  console.log(JSON.stringify(planSeason(), null, 2));
}
