import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: false,
  // Pin the tracing root to this project (a stray lockfile lives one dir up).
  outputFileTracingRoot: here,
  // The pages read clone.html / clone.th.html at request time via readFileSync;
  // make sure those files are bundled into the serverless functions on Vercel.
  outputFileTracingIncludes: {
    '/': ['./app/clone.html', './app/clone.th.html'],
    '/th': ['./app/clone.html', './app/clone.th.html'],
  },
};
