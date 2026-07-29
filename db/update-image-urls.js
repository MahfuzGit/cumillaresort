const fs = require('fs');
const path = require('path');

const OLD_CDN = 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-media';
const NEW_CDN = 'https://vxncrshdjxixhryizgly.supabase.co/storage/v1/object/public/cumilla-resort-media';

const filesToUpdate = [
  path.join(__dirname, '..', 'lib', 'data.js'),
  path.join(__dirname, '..', 'lib', 'cms.jsx'),
  path.join(__dirname, '..', 'app', 'admin', 'cms', 'page.jsx'),
  path.join(__dirname, '..', 'app', 'api', 'upload', 'route.js'),
];

filesToUpdate.forEach((filePath) => {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(new RegExp(OLD_CDN, 'g'), NEW_CDN);
    content = content.replace(/cumilla-media/g, 'cumilla-resort-media');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated bucket name to "cumilla-resort-media" in ${path.basename(filePath)}`);
  }
});
