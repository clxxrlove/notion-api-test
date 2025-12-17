const { Client } = require("@notionhq/client");

const notion = new Client({ auth: process.env.NOTION_TOKEN });

async function main() {
  const dbId = process.env.NOTION_DATABASE_ID;

  const title = process.env.ISSUE_TITLE;
  const url = process.env.ISSUE_URL;
  const number = Number(process.env.ISSUE_NUMBER);
  const repo = process.env.REPO;

  await notion.pages.create({
    parent: { database_id: dbId },
    properties: {
      Name: { title: [{ text: { content: `#${number} ${title}` } }] },
      Repo: { rich_text: [{ text: { content: repo } }] },
      URL: { url },
      IssueNo: { number },
    },
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
