import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import { exec } from 'child_process';
import fs from 'fs';

function codexPlugin() {
  return {
    name: 'codex-admin-plugin',
    configureServer(server: any) {
      server.middlewares.use('/api/run-codex', (_req: any, res: any) => {
        const file = 'tmp/codex_snapshot.md';
        fs.mkdirSync('tmp', { recursive: true });
        fs.writeFileSync(file, '# Codex snapshot\n');
        exec(`pnpm run codex:apply ${file}`);
        res.end('ok');
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    root: __dirname,
    define: {
      'import.meta.env.SPIRAL_ENV': JSON.stringify(env.SPIRAL_ENV)
    },
    plugins: [codexPlugin()],
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      rollupOptions: {
        input: resolve(__dirname, 'index.html')
      }
    }
  };
});
