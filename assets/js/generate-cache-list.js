const fs = require('fs');
const path = require('path');

const folderPath = './assets/img/icons/solid'; // Change this to your folder
const baseUrl = '/assets/img/icons/solid';     // URL path used in your site

function listFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      listFiles(fullPath, fileList);
    } else {
      const relativePath = path.relative('.', fullPath).replace(/\\/g, '/');
      fileList.push('/' + relativePath);
    }
  });

  return fileList;
}

const files = listFiles(folderPath);
console.log('const urlsToCache = [');
files.forEach(file => {
  console.log(`  '${file}',`);
});
console.log('];');