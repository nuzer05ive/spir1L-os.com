import { ingest } from './ingest';
import { remix } from './remix';
import { publish } from './publish';

export async function runScheduler() {
  await ingest();
  await remix();
  await publish();
}

if (require.main === module) {
  runScheduler();
}
