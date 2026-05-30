import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'

// Permanent redirect: tabata.page → stint.run/tabata
// Runs before React renders to avoid any flash of content.
const host = window.location.hostname;
if (host === 'tabata.page' || host === 'www.tabata.page') {
  const target =
    'https://stint.run/tabata' +
    window.location.pathname +
    window.location.search +
    window.location.hash;
  window.location.replace(target);
  // Stop further execution so React never mounts on the old domain.
  throw new Error('Redirecting to stint.run/tabata');
}

createRoot(document.getElementById("root")!).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
