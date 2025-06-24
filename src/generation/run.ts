import { glyphGen } from './glyphGen';
import { avatarGen } from './avatarGen';
import { gifGen } from './gifGen';

export async function run() {
  glyphGen();
  avatarGen('test');
  await gifGen();
}

if (require.main === module) {
  run();
}
