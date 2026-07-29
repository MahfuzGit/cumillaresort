const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const urlMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_URL\s*=\s*(.+)/);
const keyMatch = envContent.match(/NEXT_PUBLIC_SUPABASE_ANON_KEY\s*=\s*(.+)/);

const url = urlMatch ? urlMatch[1].trim().replace(/['"]/g, '') : '';
const key = keyMatch ? keyMatch[1].trim().replace(/['"]/g, '') : '';

const BUCKET_NAME = 'cumilla-resort-media';
const supabase = createClient(url, key);

async function uploadVideo() {
  const videoPath = path.join(__dirname, '..', 'public', 'videos', 'hero_video1.mp4');
  if (!fs.existsSync(videoPath)) {
    console.error('❌ Video file not found:', videoPath);
    return;
  }

  console.log('Uploading hero_video1.mp4 to Supabase Storage bucket:', BUCKET_NAME);
  const buffer = fs.readFileSync(videoPath);

  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload('hero_video1.mp4', buffer, { contentType: 'video/mp4', upsert: true });

  if (error) {
    console.error('❌ Error uploading hero_video1.mp4:', error.message);
  } else {
    const { data: pData } = supabase.storage.from(BUCKET_NAME).getPublicUrl('hero_video1.mp4');
    console.log('✅ Uploaded hero_video1.mp4 successfully!');
    console.log('   -> Public URL:', pData.publicUrl);
  }
}

uploadVideo();
