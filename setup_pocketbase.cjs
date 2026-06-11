const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const POCKETBASE_VERSION = '0.22.25';
const DOWNLOAD_URL = `https://github.com/pocketbase/pocketbase/releases/download/v${POCKETBASE_VERSION}/pocketbase_${POCKETBASE_VERSION}_windows_amd64.zip`;

const rootDir = __dirname;
const pocketbaseDir = path.join(rootDir, 'pocketbase');
const zipPath = path.join(rootDir, 'pocketbase.zip');
const migrationsDir = path.join(pocketbaseDir, 'pb_migrations');

console.log('--- Starting PocketBase Setup ---');

// 1. Create target directories
if (!fs.existsSync(pocketbaseDir)) {
  fs.mkdirSync(pocketbaseDir);
  console.log('Created directory:', pocketbaseDir);
}
if (!fs.existsSync(migrationsDir)) {
  fs.mkdirSync(migrationsDir);
  console.log('Created directory:', migrationsDir);
}

// Helper to download with redirect follow support
function downloadFile(url, dest, callback) {
  const file = fs.createWriteStream(dest);
  
  https.get(url, (response) => {
    // Handle redirect
    if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
      file.close();
      fs.unlinkSync(dest);
      console.log(`Following redirect to: ${response.headers.location}`);
      return downloadFile(response.headers.location, dest, callback);
    }
    
    if (response.statusCode !== 200) {
      file.close();
      fs.unlinkSync(dest);
      callback(new Error(`Failed to download. Status code: ${response.statusCode}`));
      return;
    }
    
    response.pipe(file);
    
    file.on('finish', () => {
      file.close(callback);
    });
  }).on('error', (err) => {
    fs.unlink(dest, () => {}); // ignore error
    callback(err);
  });
}

console.log(`Downloading PocketBase v${POCKETBASE_VERSION} from: ${DOWNLOAD_URL}`);

downloadFile(DOWNLOAD_URL, zipPath, (err) => {
  if (err) {
    console.error('Download error:', err.message);
    process.exit(1);
  }
  
  console.log('Download complete. Extracting files...');
  
  try {
    // Windows 10/11 has tar built-in, which extracts zip files natively!
    execSync(`tar -xf "${zipPath}" -C "${pocketbaseDir}"`, { stdio: 'inherit' });
    console.log('Extraction complete.');
    
    // Clean up zip file
    fs.unlinkSync(zipPath);
    console.log('Cleaned up zip file.');
    
    console.log('\n--- Setup Successful ---');
    console.log(`PocketBase is installed. To start, run:`);
    console.log(`cd pocketbase && pocketbase.exe serve`);
  } catch (extractErr) {
    console.error('Extraction failed:', extractErr.message);
    process.exit(1);
  }
});
