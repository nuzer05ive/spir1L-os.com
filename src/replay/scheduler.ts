import { ingest } from './ingest';
import { remix } from './remix';
import { publish } from './publish';

export async function runOnce() {
  const clip = await ingest('http://example.com');
  const path = await remix(clip.id, { tone: 0, geometry: 0, scenario: 0 });
  return publish(path);
}

export function runScheduler() {
  setTimeout(async () => {
    await runOnce();
    process.exit(0);
  }, 1000);
}

if (require.main === module) {
  runScheduler();
}
