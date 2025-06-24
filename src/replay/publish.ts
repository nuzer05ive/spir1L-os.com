export async function publish() {
  const apiKey = process.env.TIKTOK_API_KEY ?? '';
  const insta = process.env.INSTAGRAM_APP_TOKEN ?? '';
  console.log('publish placeholder', { apiKey, insta });
}
