import puppeteer from "puppeteer";
import dotenv from "dotenv";
const iPhone = puppeteer.devices["iPhone 6"];
dotenv.config();
// import fs from "fs";
// import config from "./config";
// import selectors from "./selectors";

interface instagram {
  browser: Promise<puppeteer.Browser>;
  page: Promise<puppeteer.Page>;
}

class instagram implements instagram {
  constructor() {
    this.init();
  }

  async init() {
    this.browser = puppeteer.launch({ headless: false });
    this.page = (await this.browser).newPage();
    (await this.page).emulate(iPhone);
  }

  async login(username?: string, password?: string) {
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

    (await this.page).goto("https://www.instagram.com/accounts/login/");

    (await this.page).waitFor(loginSelector.USERNAME);
    (await this.page).waitFor(loginSelector.PASSWORD);

    (await this.page).tap(loginSelector.USERNAME);
    (await this.page).keyboard.type(username);

    (await this.page).tap(loginSelector.PASSWORD);
    (await this.page).keyboard.type(password);

    (await this.page).tap(loginSelector.LOGIN_BUTTON);

    (await this.page).waitFor(loginSelector.LOGIN_SAVE);
    (await this.page).tap(loginSelector.LOGIN_SAVE);

    (await this.page).waitFor(loginSelector.HOME_SCREEN);
    (await this.page).tap(loginSelector.HOME_SCREEN);

    console.log(`Logado: ${username}`);
  }

  async post() {
    const postSelector = {
      POST_BUTTON: "div.q02Nz._0TPg > svg",
    };
  }
}

export default new instagram();

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
