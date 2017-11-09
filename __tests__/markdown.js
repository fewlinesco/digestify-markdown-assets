const markdown = require('digestify-markdown-assets/src/markdown');

const content = `
# Hello
I'm a dummy, yet valid, markdown!
I contain [awesome links](a-file.txt) to local files.
I contain remote links like [GitHub](https://github.com)
I have link which does not care a lot about blind people [](./a-file.txt) :(
But, I can also contain a link to a file [in a relative folder](/assets/existing-file.txt)
And, last but not least, I can go to [a parent folder](../somewhere-else/file.txt)
I almost forgot but I can also contain already [generated files](https://my-cdn.com/__tests__/fixtures/already-generated-file-b5467ade2eb2957a7d3ef293bd09863a.txt)!
`;

const expectedContent = `
# Hello
I'm a dummy, yet valid, markdown!
I contain [awesome links](https://my-cdn.com/__tests__/fixtures/a-file-7262b33d628ffd36c71dde2bdbb465f1.txt) to local files.
I contain remote links like [GitHub](https://github.com)
I have link which does not care a lot about blind people [](https://my-cdn.com/__tests__/fixtures/a-file-7262b33d628ffd36c71dde2bdbb465f1.txt) :(
But, I can also contain a link to a file [in a relative folder](https://my-cdn.com/__tests__/fixtures/assets/existing-file-12c436ac3cefc2b0b713af45a9f19908.txt)
And, last but not least, I can go to [a parent folder](https://my-cdn.com/__tests__/somewhere-else/file-f40f766f3e45330a021a1c7595397af0.txt)
I almost forgot but I can also contain already [generated files](https://my-cdn.com/__tests__/fixtures/already-generated-file-c56b873eac9502bce638ef3adb223b2a.txt)!
`;

test('updateResources: update markdown when it contains local links', () => {
  const manifest = {
    '__tests__/fixtures/a-file.txt': '__tests__/fixtures/a-file-7262b33d628ffd36c71dde2bdbb465f1.txt',
    '__tests__/fixtures/assets/existing-file.txt':
      '__tests__/fixtures/assets/existing-file-12c436ac3cefc2b0b713af45a9f19908.txt',
    '__tests__/somewhere-else/file.txt': '__tests__/somewhere-else/file-f40f766f3e45330a021a1c7595397af0.txt',
    '__tests__/fixtures/already-generated-file.txt':
      '__tests__/fixtures/already-generated-file-c56b873eac9502bce638ef3adb223b2a.txt'
  };

  const externalURL = 'https://my-cdn.com';

  return expect(
    markdown.updateLinks({ path: '__tests__/fixtures/dummy-markdown.md', content: content }, manifest, externalURL)
  ).toEqual(expectedContent);
});
