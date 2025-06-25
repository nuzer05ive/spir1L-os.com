const SPLIT = { api: 0.50, founder: 0.30, growth: 0.15, friends: 0.05 };

export async function handler(event) {
  const body = JSON.parse(event.body || '{}');
  if (body.paid) {
    return {
      statusCode: 200,
      body: JSON.stringify({ ok: true, split: SPLIT }),
    };
  }
  return { statusCode: 400, body: 'no-op' };
}
