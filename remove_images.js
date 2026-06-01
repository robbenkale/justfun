const fs = require('fs');
const filepath = './src/fixtures.ts';
let data = fs.readFileSync(filepath, 'utf8');
data = data.replace(/logoUrl:\s*'https:\/\/images\.unsplash\.com[^']*'/g, "logoUrl: undefined");
data = data.replace(/authorAvatar:\s*'https:\/\/images\.unsplash\.com[^']*'/g, "authorAvatar: undefined");
fs.writeFileSync(filepath, data);
console.log('done replacement');
