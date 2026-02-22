const fs = require('fs');
const path = require('path');

const accessKey = process.env.QINIU_ACCESS_KEY;
const secretKey = process.env.QINIU_SECRET_KEY;
const bucket = process.env.QINIU_BUCKET;

const mimeTypes = {
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || 'application/octet-stream';
}

if (!accessKey || !secretKey || !bucket) {
  console.error('请配置七牛云环境变量: QINIU_ACCESS_KEY, QINIU_SECRET_KEY, QINIU_BUCKET');
  process.exit(1);
}

const qiniu = require('qiniu');

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z2;

const formUploader = new qiniu.form_up.FormUploader(config);

const distDir = path.join(__dirname, '..', '.next', 'static');
const qiniuPrefix = '_next/static';

function getAllFiles(dir, basePath = '') {
  const files = [];
  if (!fs.existsSync(dir)) {
    console.log('目录不存在:', dir);
    return files;
  }
  
  const items = fs.readdirSync(dir);
  items.forEach(item => {
    const filePath = path.join(dir, item);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      files.push(...getAllFiles(filePath, basePath ? `${basePath}/${item}` : item));
    } else {
      const key = basePath ? `${basePath}/${item}` : item;
      files.push({ localPath: filePath, key, size: stat.size });
    }
  });
  return files;
}

function uploadFile(filePath, key, fileSize) {
  return new Promise((resolve, reject) => {
    const fullKey = `${qiniuPrefix}/${key}`;
    const putPolicy = new qiniu.rs.PutPolicy({ scope: bucket });
    const uploadToken = putPolicy.uploadToken(mac);
    
    const fileContent = fs.readFileSync(filePath);
    
    if (fileContent.length !== fileSize) {
      console.warn(`文件大小不匹配: ${fileContent.length} vs ${fileSize}`);
    }
    
    const putExtra = new qiniu.form_up.PutExtra();
    putExtra.mimeType = getMimeType(filePath);
    
    formUploader.put(uploadToken, fullKey, fileContent, putExtra, (err, body, info) => {
      if (err) {
        reject(err);
      } else if (info.statusCode === 200) {
        resolve(body);
      } else {
        reject(new Error(`Status: ${info.statusCode}, Body: ${JSON.stringify(body)}`));
      }
    });
  });
}

async function main() {
  console.log('开始上传静态资源到七牛云...\n');
  console.log('七牛云路径前缀:', qiniuPrefix);
  console.log('本地目录:', distDir);
  
  const files = getAllFiles(distDir);
  console.log(`共 ${files.length} 个文件待上传\n`);
  
  if (files.length === 0) {
    console.log('没有文件需要上传');
    process.exit(1);
  }

  let successCount = 0;
  let failCount = 0;
  
  for (let i = 0; i < files.length; i++) {
    const { localPath, key, size } = files[i];
    try {
      await uploadFile(localPath, key, size);
      successCount++;
      console.log(`[${i + 1}/${files.length}] ✓ ${key} (${size} bytes)`);
    } catch (err) {
      failCount++;
      console.error(`[${i + 1}/${files.length}] ✗ ${key}`, err.message);
    }
  }
  
  console.log(`\n上传完成！成功: ${successCount}, 失败: ${failCount}`);
  
  if (failCount > 0) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('上传出错:', err);
  process.exit(1);
});
