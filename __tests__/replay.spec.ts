import { runOnce } from '../src/replay/scheduler';
import * as ingestMod from '../src/replay/ingest';
import * as remixMod from '../src/replay/remix';
import * as publishMod from '../src/replay/publish';

test('replay chain', async () => {
  jest.spyOn(ingestMod, 'ingest').mockResolvedValue({ id: '1', transcript: 'T' });
  jest.spyOn(remixMod, 'remix').mockResolvedValue('/tmp/reel.mp4');
  jest.spyOn(publishMod, 'publish').mockResolvedValue({ platform: 'tiktok', postId: 'x' });
  await expect(runOnce()).resolves.toEqual({ platform: 'tiktok', postId: 'x' });
});
