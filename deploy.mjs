import Client from 'ssh2-sftp-client';
import path from 'path';

const sftp = new Client();

const config = {
  host: 'access-5020448286.webspace-host.com',
  port: 22,
  username: 'a140926',
  password: 'OJODORADO0010***'
};

async function deploy() {
  try {
    console.log('Connecting to IONOS SFTP...');
    await sftp.connect(config);
    console.log('Connected!');

    const localPath = path.resolve(process.cwd(), 'dist');
    const remotePath = '/GACE';

    console.log(`Uploading ${localPath} to ${remotePath}...`);
    
    // uploadDir uploads the *contents* of localPath into remotePath.
    await sftp.uploadDir(localPath, remotePath);
    
    console.log('Deploy complete! The website should now be live.');
  } catch (err) {
    console.error('Deployment failed:', err.message);
  } finally {
    sftp.end();
  }
}

deploy();
