import { Client } from "@notionhq/client";

const notion = new Client({
  auth: Bun.env.NOTION_TOKEN,
});

export const insertBlock = async (content: string) => {
  const pages = await notion.databases.query({
    database_id: Bun.env.NOTION_DB!,
    sorts: [
      {
        property: "Created time",
        direction: "descending",
      },
    ],
    page_size: 1,
  });
  if (pages.results.length > 0) {
    const page = pages.results[0];
    const p = await notion.blocks.children.append({
      block_id: page.id,
      children: [
        {
          type: "paragraph",
          paragraph: {
            rich_text: [
              {
                text: {
                  content,
                },
              },
            ],
          },
        },
      ],
    });
    return p;
  } else {
    throw new Error("No pages found");
  }
};
