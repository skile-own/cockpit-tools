const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const root = path.resolve(__dirname, '..');
const cli = path.join(root, 'node_modules/@tauri-apps/cli/tauri.js');
function render(source, output, sizes = []) {
  const result = spawnSync(process.execPath, [cli, 'icon', source, '--output', output, ...sizes.flatMap(size => ['--png', String(size)])], { cwd: root, stdio: 'inherit' });
  if (result.status !== 0) throw new Error('Icon generation failed');
}
const icon = 'src/assets/brand/polls-icon.png';
render(icon, 'src-tauri/icons');
render(icon, 'src-tauri/icons', [16, 48, 256, 512]);
fs.copyFileSync(path.join(root, 'src-tauri/icons/512x512.png'), path.join(root, 'src-tauri/icons/icon.png'));
fs.copyFileSync(path.join(root, icon), path.join(root, 'public/polls.png'));
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'polls-tray-'));
try {
  render('src/assets/brand/polls-mark.png', temporary, [36]);
  fs.copyFileSync(path.join(temporary, '36x36.png'), path.join(root, 'src-tauri/icons/tray/status-template.png'));
} finally {
  fs.rmSync(temporary, { recursive: true, force: true });
}
