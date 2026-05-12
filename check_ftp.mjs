import Client from 'ssh2-sftp-client';

const sftp = new Client();

const config = {
  host: 'access-5020448286.webspace-host.com',
  port: 22,
  username: 'a140926',
  password: 'OJODORADO0010***'
};

async function checkRemote() {
  try {
    console.log('Connecting...');
    await sftp.connect(config);
    console.log('Connected. Listing /GACE directory:');
    const list = await sftp.list('/GACE');
    for (const item of list) {
        console.log(`- ${item.name} (${item.type})`);
    }
  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    sftp.end();
  }
}

checkRemote();
