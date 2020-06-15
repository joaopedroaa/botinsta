import puppeteer from "puppeteer";
import fs from "fs";
import config from "./config";
import selectors from "./selectors";
import dotenv from "dotenv";
dotenv.config();
const iPhone = puppeteer.devices["iPhone 6"];

async function loadCookies(page) {
  const cookiesPath = "cookies.txt";
  const previousSession = fs.existsSync(cookiesPath);
  if (previousSession) {
    // kollar om cookies finns
    const content = fs.readFileSync(cookiesPath); // läser in dom
    const cookiesArr = JSON.parse(content);
    if (cookiesArr.length !== 0) {
      for (let cookie of cookiesArr) {
        await page.setCookie(cookie); // lägger in puppeteer
      }
      console.log("cookies har laddats in\n");
    }
  }
  console.log("cookies into\n");
}
async function browser() {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  return await page.emulate(iPhone);
  console.log(page);
}

async function createSession() {
  const page = browser();

  page.setUserAgent(config.userAgent);
  page.setViewport({ width: 1000, height: 1000 });
  page.endSession = () => {
    browser.close();
  };

  return page;
}

async function login(username, password) {
  const loginSelector = {
    USERNAME: '[name="username"]',
    PASSWORD: '[name="password"]',
    LOGIN_BUTTON:
      "form > div > button.sqdOP.L3NKy.y3zKF > div.Igw0E.IwRSH.eGOV_._4EzTm",
    LOGIN_SAVE:
      "#react-root > section > main > div > div > section > div > button.sqdOP.L3NKy.y3zKF>",
  };
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  console.log(page);
  await page.emulate(iPhone);

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
}

async function instagram() {
  // const browser = await puppeteer.launch();
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://instagram.com");
  // await page.screenshot({ path: "example.png" });
  await page.emulate(iPhone); // now i get the mobile version of the website.
  loadCookies(page);

  // await page.waitForSelector(selectors.loginPhone);
  // await page.click(selectors.loginPhone);
  // try {
  // } catch (err) {
  //   await page.screenshot({ path: "error.jpg" });
  //   console.log(err);
  // }

  // await browser.close();
}

// createSession();
login(process.env.USERNAME, process.env.PASSWORD);
