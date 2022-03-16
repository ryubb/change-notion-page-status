const github = require("@actions/github");
const core = require("@actions/core");

const notion = require("./notion");
const util = require("./util");

const notionKey = core.getInput("notion-key");
const statusProperty = core.getInput("status-property");
const statusValue = core.getInput("status-value");
const notionUrlHook = core.getInput("notion-url-hook");

async function run() {
  const pullRequestBody = github.context.payload.pull_request.body;
  const pattern = new RegExp(
    `^${notionUrlHook}\\s*(https:\\/\\/www.notion.so\\/.+)`,
  );
  const result = pattern.exec(pullRequestBody);
  const notionPageUrl = result && result[1];

  if (!notionPageUrl) {
    core.setFailed("notionのURLがPRに記載されていません");
    return;
  }

  const pageId = util.getPageId(notionPageUrl);
  if (!pageId) {
    core.setFailed("pageIdの取得に失敗しました");
    return;
  }

  try {
    await notion.updatePage(notionKey, pageId, statusProperty, statusValue);
    console.log("ページの更新が完了しました");
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    }
  }
}

run();
