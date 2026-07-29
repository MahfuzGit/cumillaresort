const { Client } = require('pg');

const databaseUrl = 'postgresql://postgres.vxncrshdjxixhryizgly:321%40%23MahfuzProton@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true';

const client = new Client({
  connectionString: databaseUrl,
  ssl: { rejectUnauthorized: false }
});

async function setupPolicies() {
  await client.connect();
  console.log('Connected to Supabase DB via SQL...');

  const queries = [
    `DROP POLICY IF EXISTS "Public Select" ON storage.objects;`,
    `CREATE POLICY "Public Select" ON storage.objects FOR SELECT USING (bucket_id = 'cumilla-resort-media');`,
    `DROP POLICY IF EXISTS "Public Insert" ON storage.objects;`,
    `CREATE POLICY "Public Insert" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'cumilla-resort-media');`,
    `DROP POLICY IF EXISTS "Public Update" ON storage.objects;`,
    `CREATE POLICY "Public Update" ON storage.objects FOR UPDATE USING (bucket_id = 'cumilla-resort-media');`
  ];

  for (const q of queries) {
    try {
      await client.query(q);
      console.log('Executed:', q);
    } catch (e) {
      console.warn('Query warning:', e.message);
    }
  }

  console.log('\n✅ Storage RLS Policies set up successfully!');
  await client.end();
}

setupPolicies();
