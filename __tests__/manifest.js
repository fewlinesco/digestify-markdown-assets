const manifest = require('digestify-markdown-assets/src/manifest');

test('manifestFromPaths: build a manifest from a list of files', () => {
  expect.assertions(1);

  return manifest
    .fromPaths([
      '__tests__/fixtures/a-file.txt',
      '__tests__/fixtures/another-file.txt',
      '__tests__/fixtures/yet-another-file.txt'
    ])
    .then(data =>
      expect(data).toEqual({
        '__tests__/fixtures/a-file.txt': '__tests__/fixtures/a-file-7262b33d628ffd36c71dde2bdbb465f1.txt',
        '__tests__/fixtures/another-file.txt': '__tests__/fixtures/another-file-12c436ac3cefc2b0b713af45a9f19908.txt',
        '__tests__/fixtures/yet-another-file.txt':
          '__tests__/fixtures/yet-another-file-f40f766f3e45330a021a1c7595397af0.txt'
      })
    );
});
