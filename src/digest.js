const path = require('path');
const md5File = require('md5-file/promise');

const digestifyName = (filePath, hash) => {
  const parsedFile = path.parse(filePath);

  return path.join(parsedFile.dir, parsedFile.name + '-' + hash + parsedFile.ext);
};

const buildDigest = (filePath, hash) => ({
  path: filePath,
  hash: hash,
  digestifiedPath: digestifyName(filePath, hash)
});

const digest = filePath => md5File(filePath).then(hash => buildDigest(filePath, hash));

const digestAll = filePaths => Promise.all(filePaths.map(digest));

module.exports = {
  digest: digest,
  digestAll: digestAll
};
