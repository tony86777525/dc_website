import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://tony86777525.github.io',
  base: '/dc_website',
  integrations: [react()],
  output: 'static',
  devToolbar: { enabled: false },
});
