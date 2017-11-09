const path = require('path');
const { URL } = require('url');

const LinkRegex = /\[.*?\]\((.*?)\)/g;

const updateLinks = ({ path: markdownPath, content: content }, manifest, CDN) => {
  const updateMarkdown = (markdown, replacementURL) => markdown.replace(replacementURL.old, replacementURL.new);
  const links = (content.match(LinkRegex) || []).map(link => link.replace(LinkRegex, '$1'));
  const toExternalURL = absolutePath => (absolutePath ? new URL(absolutePath, CDN) : null);
  const comeFromCDN = oldURL => oldURL.startsWith(CDN);
  const cleanupGeneratedURL = oldURL => oldURL.replace(CDN, '').replace(/(-[a-f0-9]+)(\.[^.]+)/, '$2');
  const toNewURL = oldURL => {
    const url = comeFromCDN(oldURL) ? cleanupGeneratedURL(oldURL) : oldURL;

    return toExternalURL(manifest[path.join('.', url)] || manifest[path.join(path.dirname(markdownPath), url)]) || url;
  };

  return links.map(oldURL => ({ old: oldURL, new: toNewURL(oldURL) })).reduce(updateMarkdown, content);
};

module.exports = {
  updateLinks: updateLinks
};
