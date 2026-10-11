
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemaTypes/index.js';

export default defineConfig({
  name: 'raio-portfolio',
  title: 'RAIO — Portfólio Visual',
  projectId: 'dsc1bcf0',
  dataset: 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
});
