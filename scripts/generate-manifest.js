import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the dist directory and create a manifest
// The dist directory is relative to the project root, not the scripts directory
const projectRoot = path.resolve(__dirname, '..');
const distPath = path.join(projectRoot, 'dist');

function generateManifest(dirPath, basePath = '') {
  const manifest = {};
  
  const items = fs.readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = path.join(dirPath, item);
    const relativePath = basePath ? `${basePath}/${item}` : item;
    
    if (fs.statSync(fullPath).isDirectory()) {
      // Recursively process subdirectories
      Object.assign(manifest, generateManifest(fullPath, relativePath));
    } else {
      // Add file to manifest
      manifest[relativePath] = relativePath; // We just need the path relative to dist
    }
  }
  
  return manifest;
}

// Generate the manifest
const manifest = generateManifest(distPath);

// Write the manifest to workers-site/manifest.json
const workersSitePath = path.join(projectRoot, 'workers-site');
if (!fs.existsSync(workersSitePath)) {
  fs.mkdirSync(workersSitePath, { recursive: true });
}

const manifestPath = path.join(workersSitePath, 'manifest.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log('Manifest generated successfully:', Object.keys(manifest).length, 'files');