import { promises as fs } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

export async function remix(id: string, tag: { tone: number; geometry: number; scenario: number }): Promise<string> {
  const file = join(tmpdir(), 'reel.mp4');
  await fs.writeFile(file, `${id}:${JSON.stringify(tag)}`);
  return file;
}
