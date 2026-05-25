import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

function figmaAssetFallback(): Plugin {
  const prefix = 'figma:asset/';
  const virtualPrefix = '\0figma-asset:';

  return {
    name: 'figma-asset-fallback',
    enforce: 'pre',
    resolveId(id) {
      if (id.startsWith(prefix)) return virtualPrefix + id.slice(prefix.length);
      return null;
    },
    load(id) {
      if (!id.startsWith(virtualPrefix)) return null;
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#0f62fe"/><stop offset="1" stop-color="#16c7d9"/></linearGradient></defs><rect width="128" height="128" rx="28" fill="url(#g)"/><path d="M30 40h68v12H30zM30 60h68v12H30zM30 80h42v12H30z" fill="white" opacity=".94"/><path d="M88 76l10 10 18-22" fill="none" stroke="white" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
      const url = `data:image/svg+xml,${encodeURIComponent(svg)}`;
      return `export default ${JSON.stringify(url)};`;
    }
  };
}

export default defineConfig({
  plugins: [figmaAssetFallback(), react(), tailwindcss()],
});
