import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'

// Permanent redirects — run before React renders to avoid any flash of content.
const host = window.location.hostname;
if (host === 'tabata.page' || host === 'www.tabata.page') {
  // tabata.page → stint.run/tabata
  window.location.replace(
    'https://stint.run/tabata' +
      window.location.pathname +
      window.location.search +
      window.location.hash
  );
  throw new Error('Redirecting to stint.run/tabata');
}
if (host === 'www.stint.run') {
  // www.stint.run → stint.run (preserve path/query/hash)
  window.location.replace(
    'https://stint.run' +
      window.location.pathname +
      window.location.search +
      window.location.hash
  );
  throw new Error('Redirecting to stint.run');
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
