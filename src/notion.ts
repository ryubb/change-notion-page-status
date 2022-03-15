const { Client, APIResponseError } = require("@notionhq/client");

const notionKey = core.getInput("notion-key");
const notionClient = new Client({
  auth: notionKey,
});

async function updatePage(
  pageId: string,
  statusProperty: string,
  statusValue: string,
): Promise<void> {
  try {
    await notionClient.pages.update({
      page_id: pageId,
      properties: {
        [statusProperty]: {
          select: {
            name: statusValue,
          },
        },
      },
    });
  } catch (error: typeof APIResponseError) {
    console.error("errorが発生しました");
    console.error(error.body);
  }
}

exports.updatePage = updatePage;
