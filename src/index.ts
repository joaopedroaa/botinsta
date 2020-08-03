import { init, login, post } from "./instagram";
// import { getRedditPosts } from "./reddit";
// import puppeteer from "puppeteer";

const postData = [
  {
    image: "cat.jpg",
    description: "Funciona hahaha",
  },
];


// const getRedditPost = async (initial: number, final: number): Array => {
//   const posts = await getRedditPosts();
//   return posts.slice(initial, final);
// };

async function app() {
  const { page: initPage, browser } = await init(true);

  const loginPage = await login(
    initPage,
    process.env.USERNAME,
    process.env.PASSWORD
  );

  for (const data of postData) {
    await post(loginPage, data.image, data.description);
  }

  await browser.close();
}

app();
