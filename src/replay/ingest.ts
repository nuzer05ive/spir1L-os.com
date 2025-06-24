export async function ingest(url: string): Promise<{ id: string; transcript: string }> {
  void url;
  return { id: 'mock', transcript: 'HELLO' };
}
