const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

// Parse .env.local
const envPath = path.join(__dirname, '..', '.env.local');
let databaseUrl = '';

try {
  const content = fs.readFileSync(envPath, 'utf8');
  const urlMatch = content.match(/DATABASE_URL\s*=\s*(.+)/);
  if (urlMatch) databaseUrl = urlMatch[1].trim().replace(/['"]/g, '');
} catch (e) {
  console.error('Error reading .env.local:', e.message);
}

if (!databaseUrl || databaseUrl.includes('postgres://[user]') || databaseUrl.includes('your-neon-url')) {
  console.error('\n❌ ERROR: Please configure your real Neon DATABASE_URL in .env.local first and save the file!');
  process.exit(1);
}

let sql;
if (databaseUrl.includes('neon.tech')) {
  const { neon } = require('@neondatabase/serverless');
  sql = neon(databaseUrl);
} else {
  const { Client } = require('pg');
  sql = async (strings, ...values) => {
    const client = new Client({
      connectionString: databaseUrl,
      ssl: { rejectUnauthorized: false }
    });
    let queryText = strings[0];
    for (let i = 1; i < strings.length; i++) {
      queryText += `$${i}` + strings[i];
    }
    await client.connect();
    try {
      const res = await client.query(queryText, values);
      return res.rows;
    } finally {
      await client.end();
    }
  };
}


const args = process.argv.slice(2);
const email = args[0] || 'superadmin@admin.com';
const password = args[1] || '123superadmin321';
let roleKey = args[2] || 'superadmin';

// Map 'admin' alias to 'superadmin'
if (roleKey === 'admin') {
  roleKey = 'superadmin';
}

// Validate role value
const allowedRoles = ['superadmin', 'gm', 'frontdesk', 'housekeeping'];
if (!allowedRoles.includes(roleKey)) {
  console.error(`❌ ERROR: Invalid role "${roleKey}". Allowed roles are: ${allowedRoles.join(', ')}`);
  process.exit(1);
}

if (!args[0] || !args[1]) {
  console.log('ℹ️ No arguments provided. Defaulting to:');
  console.log(`  Email: ${email}`);
  console.log(`  Password: ${password}`);
  console.log(`  Role: ${roleKey}`);
  console.log('\n💡 You can also specify custom credentials by running:');
  console.log('  node db/create-admin.js <email> <password> <role>');
  console.log('  Allowed roles: superadmin, gm, frontdesk, housekeeping');
  console.log('  Example: node db/create-admin.js staff@admin.com mysecretpass gm\n');
}

console.log(`Creating user ${email} with role ${roleKey}...`);

const passwordHash = bcrypt.hashSync(password, 10);

sql`
  INSERT INTO users (email, password_hash, role_key)
  VALUES (${email.toLowerCase().trim()}, ${passwordHash}, ${roleKey})
  ON CONFLICT (email) DO UPDATE
  SET password_hash = EXCLUDED.password_hash, role_key = EXCLUDED.role_key
`
.then(() => {
  console.log('\n===========================================');
  console.log('✅ USER CREATION INITIATED SUCCESSFULLY!');
  console.log('===========================================');
  console.log(`Email: ${email}`);
  console.log(`Role: ${roleKey}`);
  console.log('-------------------------------------------');
  console.log('✅ User can now log in at /admin/login');
  console.log('   Password is hashed with bcrypt (secure).');
  console.log('   Session uses HttpOnly JWT cookie.');
  console.log('===========================================');
})
.catch(err => {
  console.error('❌ Error creating user:', err.message || err);
});
