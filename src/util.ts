function getPageId(url: string): string | null {
  const pagePathPattern = /^https:\/\/www.notion.so\/.*\/(.+)$/;
  const pagePathResult = pagePathPattern.exec(url);
  if (!pagePathResult) return null;

  const pagePath = pagePathResult && pagePathResult[1];
  // includesで条件分岐せずにRegexを書きたい
  const pageIdPattern = pagePath.includes("-") ? /^.*-(\w+)$$/ : /^(\w+)$/;
  const pageIdResult = pageIdPattern.exec(pagePath);
  return pageIdResult && pageIdResult[1];
}

exports.getPageId = getPageId;
