const digest = require('./digest');

const manifestFromPaths = paths => {
  const buildManifest = (manifest, digest) => {
    manifest[digest.path] = digest.digestifiedPath;
    return manifest;
  };

  return digest.digestAll(paths).then(digests => digests.reduce(buildManifest, {}));
};

module.exports = {
  fromPaths: manifestFromPaths
};
