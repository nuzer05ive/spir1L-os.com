import fs from 'fs';
import path from 'path';

export function flashFirmware(cfgPath: string) {
  const cfg = fs.readFileSync(path.resolve(cfgPath), 'utf8');
  console.log('Flashing firmware with config:\n' + cfg);
  // TODO: invoke hardware flashing toolchain
}

if (require.main === module) {
  flashFirmware('firmware/kappa.cfg');
}
