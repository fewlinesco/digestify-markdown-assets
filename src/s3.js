const AWS = require('aws-sdk');

const s3 = new AWS.S3();

const importFile = (bucket, path, content) =>
  new Promise((resolve, reject) =>
    s3.putObject(
      { Bucket: bucket, Key: path, Body: content },
      (error, data) => (error ? reject(`Can not upload file "${path}" to S3: ${error}`) : resolve(path))
    )
  );

module.exports = {
  import: importFile
};
