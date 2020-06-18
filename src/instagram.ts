import puppeteer from "puppeteer";
// import fs from "fs";
// import config from "./config";
// import selectors from "./selectors";
import dotenv from "dotenv";
const iPhone = puppeteer.devices["iPhone 6"];
dotenv.config();

export async function login(username?: string, password?: string) {
  if (!username || !password) {
    throw new Error("Invalid name or password");
  }

  const loginSelector = {
    USERNAME: '[name="username"]',
    PASSWORD: '[name="password"]',
    LOGIN_BUTTON: "button.sqdOP.L3NKy.y3zKF > div.Igw0E.IwRSH.eGOV_._4EzTm",
    LOGIN_SAVE: "div.cmbtv > button.sqdOP.yWX7d.y3zKF",
    HOME_SCREEN: "div.mt3GC > button.aOOlW.HoLwm",
  };

  // Initialized Bot
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.emulate(iPhone);
  //

  await page.goto("https://www.instagram.com/accounts/login/");

  await page.waitFor(loginSelector.USERNAME);
  await page.waitFor(loginSelector.PASSWORD);

  await page.tap(loginSelector.USERNAME);
  await page.keyboard.type(username);

  await page.tap(loginSelector.PASSWORD);
  await page.keyboard.type(password);

  await page.tap(loginSelector.LOGIN_BUTTON);

  await page.waitFor(loginSelector.LOGIN_SAVE);
  await page.tap(loginSelector.LOGIN_SAVE);

  await page.waitFor(loginSelector.HOME_SCREEN);
  await page.tap(loginSelector.HOME_SCREEN);

  console.log(`Logado: ${username}`);
}

// async function loadCookies(page) {
//   const cookiesPath = "cookies.txt";
//   const previousSession = fs.existsSync(cookiesPath);
//   if (previousSession) {
//     // kollar om cookies finns
//     const content = fs.readFileSync(cookiesPath); // läser in dom
//     const cookiesArr = JSON.parse(content);
//     if (cookiesArr.length !== 0) {
//       for (let cookie of cookiesArr) {
//         await page.setCookie(cookie); // lägger in puppeteer
//       }
//       console.log("cookies har laddats in\n");
//     }
//   }
//   console.log("cookies into\n");
// }

// async function instagram() {
//   // const browser = await puppeteer.launch();
//   const browser = await puppeteer.launch({ headless: false });
//   const page = await browser.newPage();
//   await page.goto("https://instagram.com");
//   // await page.screenshot({ path: "example.png" });
//   await page.emulate(iPhone); // now i get the mobile version of the website.

//   // await page.waitForSelector(selectors.loginPhone);
//   // await page.click(selectors.loginPhone);
//   // try {
//   // } catch (err) {
//   //   await page.screenshot({ path: "error.jpg" });
//   //   console.log(err);
//   // }

//   // await browser.close();
// }