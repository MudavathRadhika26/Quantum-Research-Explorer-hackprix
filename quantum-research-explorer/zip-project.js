const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Preparing clean ZIP package (excluding node_modules/dist/db files)...');

const tempDir = path.join(__dirname, 'temp_zip_dist');

// Clean up old files
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
if (fs.existsSync('quantum-research-explorer.zip')) {
  fs.unlinkSync('quantum-research-explorer.zip');
}

fs.mkdirSync(tempDir);
fs.mkdirSync(path.join(tempDir, 'backend'));
fs.mkdirSync(path.join(tempDir, 'frontend'));

// Helper to copy directory excluding node_modules and build dist outputs
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    if (
      entry.name === 'node_modules' || 
      entry.name === 'dist' || 
      entry.name === '.vite' || 
      entry.name === 'database.sqlite'
    ) {
      continue;
    }
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy source files
copyDir('backend', path.join(tempDir, 'backend'));
copyDir('frontend', path.join(tempDir, 'frontend'));
fs.copyFileSync('package.json', path.join(tempDir, 'package.json'));
fs.copyFileSync('README.md', path.join(tempDir, 'README.md'));
fs.copyFileSync('zip-project.js', path.join(tempDir, 'zip-project.js'));

try {
  // Zip the temp directory contents
  execSync(
    `powershell -Command "Compress-Archive -Path '${tempDir}/*' -DestinationPath 'quantum-research-explorer.zip' -Force"`,
    { stdio: 'inherit' }
  );
  console.log('Cleaning up temporary files...');
  fs.rmSync(tempDir, { recursive: true, force: true });
  console.log('ZIP package created successfully (cleaned of node_modules)!');
} catch (err) {
  console.error('Failed to create ZIP package:', err.message);
  if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true, force: true });
  }
  process.exit(1);
}
