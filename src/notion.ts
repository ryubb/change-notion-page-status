const { Client, APIResponseError } = require("@notionhq/client");

async function updatePage(
  notionKey: string,
  pageId: string,
  statusProperty: string,
  statusValue: string,
): Promise<void> {
  const notionClient = new Client({
    auth: notionKey,
  });

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
    throw new Error("pageの更新に失敗しました。");
  }
}

exports.updatePage = updatePage;
