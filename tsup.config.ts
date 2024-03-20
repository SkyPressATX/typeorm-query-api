import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  target: 'es2022',
  format: ['esm', 'cjs'],
  splitting: false,
  sourcemap: true,
  minify: false,
  clean: true,
  dts: true,
  platform: 'node',
});
