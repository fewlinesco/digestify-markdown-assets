const digest = require('digestify-markdown-assets/src/digest');

test('digest: build a digest for a file', () => {
  expect.assertions(3);

  return digest.digest('__tests__/fixtures/a-file.txt').then(data => {
    expect(data.path).toEqual('__tests__/fixtures/a-file.txt');
    expect(data.hash).toEqual('7262b33d628ffd36c71dde2bdbb465f1');
    expect(data.digestifiedPath).toEqual('__tests__/fixtures/a-file-7262b33d628ffd36c71dde2bdbb465f1.txt');
  });
});

test('digest: build a digest for a non existing file', () => {
  expect.assertions(1);

  return digest.digest('__tests__/fixtures/not-a-file').catch(data => {
    expect(data.code).toEqual('ENOENT');
  });
});

test('digestAll: build a full digest for a list of existing files', () => {
  expect.assertions(1);

  return digest
    .digestAll([
      '__tests__/fixtures/a-file.txt',
      '__tests__/fixtures/another-file.txt',
      '__tests__/fixtures/yet-another-file.txt'
    ])
    .then(data =>
      expect(data.map(digest => digest.digestifiedPath)).toEqual([
        '__tests__/fixtures/a-file-7262b33d628ffd36c71dde2bdbb465f1.txt',
        '__tests__/fixtures/another-file-12c436ac3cefc2b0b713af45a9f19908.txt',
        '__tests__/fixtures/yet-another-file-f40f766f3e45330a021a1c7595397af0.txt'
      ])
    );
});

test("digestAll: build a full digest when some of the files doesn't exist", () => {
  expect.assertions(1);

  return digest
    .digestAll([
      '__tests__/fixtures/a-file.txt',
      '__tests__/fixtures/not-a-file',
      '__tests__/fixtures/yet-another-file.txt'
    ])
    .catch(data => expect(data.code).toEqual('ENOENT'));
});
