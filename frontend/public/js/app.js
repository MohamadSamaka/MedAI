import { initRouter } from './routes/router.js';

// Initialize the router when the page loads
initRouter();

window.addEventListener('popstate', () => {
  initRouter();
});
