const fs = require('fs');
const { execSync } = require('child_process');

console.log('🔄 Menyalin Prisma Schema dari backend...');
let schema = fs.readFileSync('../../apps/api/prisma/schema.prisma', 'utf8');

// Hapus baris 'output = "./generated/client"' agar Prisma ter-generate di dalam node_modules frontend
schema = schema.replace(/output\s*=\s*"\.\/generated\/client"/, '');

fs.mkdirSync('prisma', { recursive: true });
fs.writeFileSync('prisma/schema.prisma', schema);

console.log('⚡ Generating local Prisma Client untuk Frontend...');
execSync('npx prisma generate', { stdio: 'inherit' });

console.log('🚀 Memulai proses Next.js Build...');
execSync('npx next build', { stdio: 'inherit' });
