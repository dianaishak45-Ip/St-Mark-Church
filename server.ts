import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API Proxy Route for Coptic Readings
  app.get('/api/katamars', async (req, res) => {
    const urls = [
      'https://api.coptic.io/api/readings?detailed=true&lang=ar'
    ];

    let lastError = null;
    for (const url of urls) {
      try {
        console.log(`Trying proxy to: ${url}`);
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          return res.json(data);
        }
        console.error(`Failed ${url}: ${response.status}`);
      } catch (error) {
        console.error(`Error ${url}:`, error);
        lastError = error;
      }
    }
    
    res.status(500).json({ 
      error: 'Failed to fetch readings from all sources',
      details: String(lastError)
    });
  });

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
