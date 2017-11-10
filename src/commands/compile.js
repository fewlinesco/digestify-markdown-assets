const digestifyMarkdownAssets = require('../digestifyMarkdownAssets.js');

module.exports = {
  command: 'compile [options] <bucket> <cdn-url>',
  desc:
    `Generate a manifest file, update all the markdown containing the files in the manifest, and then upload ` +
    `them to S3. \n\n` +
    `Don't forget to set your AWS credentials http://docs.aws.amazon.com/cli/latest/userguide/cli-chap-getting-started.html`,
  handler: digestifyMarkdownAssets,
  builder: yargs => {
    yargs.option('root-path', {
      describe: 'root folder, from where we start to search for them',
      default: '.'
    });

    yargs.option('pattern', {
      describe: 'Glob pattern matching files to compile',
      default: null
    });

    yargs.option('images', {
      describe: 'Default matcher for image files',
      default: true
    });

    yargs.positional('cdn-url', {
      describe: 'CDN URL used in the Markdown to get the assets'
    });

    yargs.positional('bucket', {
      describe: 'AWS S3 Bucket Name where assets will be uploaded'
    });
  }
};
