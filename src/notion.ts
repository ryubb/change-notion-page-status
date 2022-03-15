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
    console.error("errorが発生しました");
    console.error(error.body);
  }
}

exports.updatePage = updatePage;
