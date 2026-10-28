import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type { IncomingMessage, ServerResponse } from 'node:http';

// Local middleware for /api/chat during `vite dev`
function localChatApiPlugin() {
  return {
    name: 'local-chat-api',
    configureServer(server: any) {
      server.middlewares.use(async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        if (req.url === '/api/chat' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk) => {
            body += chunk;
          });
          req.on('end', async () => {
            try {
              const parsed = JSON.parse(body || '{}');
              const { message } = parsed;

              // Import the deterministic processor dynamically
              const { processChatQuery } = await import('./src/utils/chatbotEngine.js');
              const response = processChatQuery(message || '');

              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify(response));
            } catch (err: any) {
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 500;
              res.end(JSON.stringify({ error: err.message || 'Internal error' }));
            }
          });
          return;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), localChatApiPlugin()],
  server: {
    port: 5173,
    host: true,
  },
});
