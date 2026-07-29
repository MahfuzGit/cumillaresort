const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Parse .env.local
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const urlMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_URL\s*=\s*(.+)/);
const keyMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY\s*=\s*(.+)/);

const url = urlMatch ? urlMatch[1].trim().replace(/['"]/g, '') : '';
const key = keyMatch ? keyMatch[1].trim().replace(/['"]/g, '') : '';

if (!url || !key) {
  console.error('❌ Supabase credentials not found in .env.local');
  process.exit(1);
}

const BUCKET_NAME = 'cumilla-resort-media';
console.log('Connecting to Supabase at:', url);
console.log('Target Bucket:', BUCKET_NAME);
const supabase = createClient(url, key);

async function uploadAll() {
  const dir = path.join(__dirname, '..', 'public', 'images');
  const files = fs.readdirSync(dir);
  console.log(`Found ${files.length} images to upload to Supabase Storage bucket "${BUCKET_NAME}"...\n`);

  for (const f of files) {
    const filePath = path.join(dir, f);
    const buffer = fs.readFileSync(filePath);
    const ext = path.extname(f).toLowerCase();
    const mime = ext === '.png' ? 'image/png' : 'image/jpeg';

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(f, buffer, { contentType: mime, upsert: true });

    if (error) {
      console.error(`❌ Failed to upload ${f}:`, error.message);
    } else {
      const { data: pData } = supabase.storage.from(BUCKET_NAME).getPublicUrl(f);
      console.log(`✅ Uploaded ${f}`);
      console.log(`   -> ${pData.publicUrl}`);
    }
  }

  console.log('\n===========================================');
  console.log(`🎉 ALL IMAGES UPLOADED TO SUPABASE "${BUCKET_NAME}"!`);
  console.log('===========================================');
}

uploadAll();
