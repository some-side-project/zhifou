const fs = require('fs');
const path = require('path');
const qiniu = require('qiniu');

const accessKey = process.env.QINIU_ACCESS_KEY;
const secretKey = process.env.QINIU_SECRET_KEY;
const bucket = process.env.QINIU_BUCKET;
const prefix = '';

if (!accessKey || !secretKey || !bucket) {
  console.error('请配置七牛云环境变量: QINIU_ACCESS_KEY, QINIU_SECRET_KEY, QINIU_BUCKET');
  process.exit(1);
}

const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const config = new qiniu.config.Config({
  zone: qiniu.zone.Zone_z0,
});

const bucketManager = new qiniu.bucket.BucketManager(mac, config);

const distDir = path.join(__dirname, '..', '.next', 'static');

function uploadDir(dir, prefix) {
  if (!fs.existsSync(dir)) {
    console.log(`目录不存在: ${dir}`);
    return;
  }

  const files = fs.readdirSync(dir);
  let uploadedCount = 0;
  let totalFiles = 0;

  function countFiles(dir, prefix) {
    const items = fs.readdirSync(dir);
    items.forEach(item => {
      const filePath = path.join(dir, item);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        countFiles(filePath, prefix ? `${prefix}/${item}` : item);
      } else {
        totalFiles++;
      }
    });
  }

  countFiles(dir, prefix);

  function uploadFile(filePath, key, callback) {
    bucketManager.uploadFile(filePath, key, { bucket }, (err, body, info) => {
      if (err) {
        console.error(`上传失败: ${key}`, err);
      } else if (info.statusCode === 200) {
        uploadedCount++;
        console.log(`上传成功: ${key} (${uploadedCount}/${totalFiles})`);
      } else {
        console.error(`上传失败: ${key}`, body);
      }
      callback();
    });
  }

  function processFiles(files, index) {
    if (index >= files.length) {
      console.log(`\n上传完成！共 ${uploadedCount}/${totalFiles} 个文件`);
      return;
    }

    const file = files[index];
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      processFiles(fs.readdirSync(filePath).map(f => path.join(file, f)), 0);
      processFiles(files, index + 1);
    } else {
      const key = prefix ? `${prefix}/${file}` : file;
      uploadFile(filePath, key, () => {
        processFiles(files, index + 1);
      });
    }
  }

  console.log('开始上传静态资源到七牛云...\n');
  processFiles(files, 0);
}

uploadDir(distDir, prefix);
