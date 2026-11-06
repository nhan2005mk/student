// Kiểm tra môi trường trước khi thi: node scripts/check-setup.js
// Không cần mạng. In ra ✔ / ✘ cho từng mục.
import { existsSync, readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const has = (p) => existsSync(new URL(p, root));
let ok = true;
const line = (pass, msg, hint = '') => {
  console.log(`${pass ? '✔' : '✘'} ${msg}${!pass && hint ? `\n    → ${hint}` : ''}`);
  if (!pass) ok = false;
};

const [major, minor] = process.versions.node.split('.').map(Number);
const nodeOk = (major === 22 && minor >= 12) || major >= 24;
line(nodeOk, `Node.js ${process.versions.node}`, 'Cần Node 22.12+ hoặc 24+ (khuyên dùng bản LTS mới nhất).');

const pkgs = ['react', 'react-dom', 'react-bootstrap', 'bootstrap', 'react-router-dom', 'axios',
  'json-server', 'concurrently', 'vite', 'vitest', '@vitejs/plugin-react', 'jsdom',
  '@testing-library/react', '@testing-library/dom', '@testing-library/jest-dom', '@testing-library/user-event'];
const missing = pkgs.filter((p) => !has(`node_modules/${p}/package.json`));
line(missing.length === 0, `node_modules đủ ${pkgs.length} package chính`, `Thiếu: ${missing.join(', ')} – chạy "npm install" khi còn mạng.`);

line(has('src/main.jsx') && has('src/App.jsx'), 'Đã có thư mục src (main.jsx, App.jsx)', 'Dán thư mục src của đề thi vào project.');
let dbOk = false;
if (has('db.json')) {
  try { JSON.parse(readFileSync(new URL('db.json', root), 'utf8')); dbOk = true; } catch { /* JSON lỗi */ }
}
line(dbOk, 'Có db.json hợp lệ', 'Dán db.json của đề thi vào project (file phải là JSON hợp lệ).');
line(has('test/setup.js'), 'Có thư mục test (để chạy npm test)', 'Dán thư mục test của đề thi vào project.');
if (!has('db.backup.json')) console.log('• (tuỳ chọn) chưa có db.backup.json – lệnh "npm run reset-db" sẽ không dùng được.');
if (!has('public')) console.log('• (tuỳ chọn) chưa có thư mục public – chỉ cần nếu đề thi có ảnh trong public/.');

console.log(ok ? '\nSẴN SÀNG: chạy "npm start" rồi mở http://localhost:5173' : '\nCHƯA SẴN SÀNG: sửa các mục ✘ ở trên.');
process.exit(ok ? 0 : 1);
