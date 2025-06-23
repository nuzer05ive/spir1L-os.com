import fs from 'fs';

export function flashFirmware(cfgPath: string) {
  const cfg = fs.readFileSync(cfgPath, 'utf8');
  console.log('Flashing firmware with config:\n' + cfg);
  // TODO: invoke hardware flashing toolchain
}

if (require.main === module) {
  flashFirmware('firmware/kappa.cfg');
}
