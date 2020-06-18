import puppeteer from "puppeteer";
import dotenv from "dotenv";
import { resolve } from "path";

import selector from "./selectors";
import verifyPopUp from "./utils/verifyPopUp";
const iPhone = puppeteer.devices["iPhone 6"];
import ora from "ora";
dotenv.config();
// import fs from "fs";
// import config from "./config";
// import selectors from "./selectors";

const spinnerInit = ora("Iniciando").start();

export async function init(showBrowser: Boolean) {
  const browser = await puppeteer.launch({
    headless: showBrowser ? false : true,
    args: ["--window-size=375,800"],
  });

  const page = await browser.newPage();
  await page.emulate(iPhone);
  spinnerInit.succeed();

  const result = {
    page,
    browser,
  };

  return result;
}

export async function login(
  page: puppeteer.Page,
  username?: string,
  password?: string
) {
  if (!username || !password) {
    spinnerInit.fail();
    throw new Error("Invalid name or password");
  }

  const spinnerLogin = ora("Iniciando login").start();
  spinnerLogin.text = "Carregando Tela de Login";

  await page.goto("https://www.instagram.com/accounts/login/");

  spinnerLogin.text = "Login: Carregando username";
  await page.waitForSelector(selector.login.USERNAME);
  await page.tap(selector.login.USERNAME);
  await page.keyboard.type(username);

  spinnerLogin.text = "Login: Carregando password";
  await page.waitForSelector(selector.login.PASSWORD);
  await page.tap(selector.login.PASSWORD);
  await page.keyboard.type(password);

  spinnerLogin.text = "Logando";
  await page.waitForSelector(selector.login.LOGIN_BUTTON);
  await page.tap(selector.login.LOGIN_BUTTON);

  //
  await page.waitForSelector(selector.login.LOGIN_SAVE);
  await page.tap(selector.login.LOGIN_SAVE);

  // await page.waitForSelector(selector.login.HOME_SCREEN);
  // await page.tap(selector.login.HOME_SCREEN);
  setInterval(
    async () => await page.screenshot({ path: "browser/browser.png" }),
    3000
  );

  spinnerLogin.text = `Logado: ${username}`;
  spinnerLogin.succeed();
  return page;
}

export async function post(
  page: puppeteer.Page,
  image: string,
  description: string
) {
  const spinnerPost = ora("Iniciando post").start();

  await page.waitForSelector(selector.post.POST_BUTTON);

  spinnerPost.text = "Verificando Pop-up";
  await verifyPopUp(page);

  spinnerPost.text = "Escolhendo imagem";
  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click(selector.post.POST_BUTTON), // some button that triggers file selection
  ]);

  await fileChooser.accept([resolve("images", image)]);
  spinnerPost.text = "Postando imagem";

  try {
    await page.waitForSelector(selector.post.POST_NEXT, {
      timeout: 3000,
    });
    await page.tap(selector.post.POST_NEXT);
  } catch (error) {
    spinnerPost.fail();
  }

  await page.waitForSelector(selector.post.POST_DESCRIPTION);
  await page.tap(selector.post.POST_DESCRIPTION);
  await page.keyboard.type(description);

  await page.waitForSelector(selector.post.POST_SHARE);
  await page.tap(selector.post.POST_SHARE);

  await page.waitForSelector(selector.post.POST_BUTTON);

  await page.screenshot({ path: "browser/post-successful.png" });

  spinnerPost.text = `Imagem postada (${image})`;
  spinnerPost.succeed();
}
