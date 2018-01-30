const callbackGlob = require('glob');
const fs = require('fs');
const path = require('path');
const util = require('util');
const manifest = require('./manifest');
const markdown = require('./markdown');
const s3 = require('./s3');

const glob = util.promisify(callbackGlob);
const readFile = util.promisify(fs.readFile);

const imagesPattern = '**/*.@(png|jpg|jpeg|gif|svg)';

const uploadAssets = (bucket, manifest) => {
  const uploadAsset = originPath =>
    readFile(path.join('.', originPath)).then(content => s3.import(bucket, manifest[originPath], content));

  return Promise.all(Object.keys(manifest).map(uploadAsset));
};

const updateMarkdowns = (CDN, manifest) => {
  const updateMarkdown = markdownPath =>
    readFile(markdownPath, 'utf8').then(content => {
      const newContent = markdown.updateLinks({ path: markdownPath, content: content }, manifest, CDN);

      return new Promise((resolve, reject) =>
        fs.writeFile(
          markdownPath,
          newContent,
          error => (error ? reject(`Can not override "${markdownPath}" file: ${error}`) : resolve(markdownPath))
        )
      );
    });

  return glob('**/*.md', { nocase: true })
    .then(paths => Promise.all(paths.map(updateMarkdown)))
    .then(() => manifest);
};

const writeManifest = manifest =>
  new Promise((resolve, reject) =>
    fs.writeFile(
      'manifest.json',
      JSON.stringify(manifest, null, 2),
      error => (error ? reject(`Can not write the manifest.json : ${error}`) : resolve(manifest))
    )
  );

const digestifyMarkdownAssets = commandLineArguments => {
  process.chdir(commandLineArguments.rootPath);

  const pattern = commandLineArguments.pattern ? commandLineArguments.pattern : imagesPattern;

  glob(pattern, { nocase: true })
    .then(manifest.fromPaths)
    .then(writeManifest)
    .then(manifest => updateMarkdowns(commandLineArguments.cdnUrl, manifest))
    .then(manifest => uploadAssets(commandLineArguments.bucket, manifest))
    .then(() => console.log('Manifest generated, Markdown updated, Assets uploaded.'))
    .catch(console.error);
};

module.exports = digestifyMarkdownAssets;
