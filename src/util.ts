function getPageId(url: string): string | null {
  const pattern = /^.*-(\w+)$/;
  const result = pattern.exec(url);
  return result && result[1];
}

exports.getPageId = getPageId;
