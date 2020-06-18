import { init, login, post } from "./instagram";
import puppeteer from "puppeteer";
const postData = [
  {
    image: "image1.png",
    description: "post feito ",
  },
  {
    image: "image2.jpg",
    description: "post feito 100% ",
  },
  {
    image: "image3.jpg",
    description: "post feito 100% por um bot :)",
  },
];

interface login {
  initPage: puppeteer.Page;
}

(async () => {
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
})();
