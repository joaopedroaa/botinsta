import puppeteer from "puppeteer";
import selector from "./selectors";
import dotenv from "dotenv";
const { resolve } = require("path");
const iPhone = puppeteer.devices["iPhone 6"];

dotenv.config();
// import fs from "fs";
// import config from "./config";
// import selectors from "./selectors";

export async function init(showBrowser: Boolean) {
  const browser = await puppeteer.launch(
    showBrowser ? { headless: false } : {}
  );

  const page = await browser.newPage();
  await page.emulate(iPhone);
  return page;
}

export async function login(
  page: puppeteer.Page,
  username?: string,
  password?: string
) {
  if (!username || !password) {
    throw new Error("Invalid name or password");
  }

  await page.goto("https://www.instagram.com/accounts/login/");

  console.log("Carregando Tela de Login");
  await page.waitFor(selector.login.USERNAME);
  await page.waitFor(selector.login.PASSWORD);
  await page.waitFor(selector.login.LOGIN_BUTTON);

  console.log("Login: Username");
  await page.tap(selector.login.USERNAME);
  await page.keyboard.type(username);

  console.log("Login: Password");
  await page.tap(selector.login.PASSWORD);
  await page.keyboard.type(password);

  console.log("Login: Carregando");
  await page.tap(selector.login.LOGIN_BUTTON);

  //

  await page.waitFor(selector.login.LOGIN_SAVE);
  await page.tap(selector.login.LOGIN_SAVE);

  await page.waitFor(selector.login.HOME_SCREEN);
  await page.tap(selector.login.HOME_SCREEN);

  console.log(`Logado: ${username}`);
  return page;
}

export async function post(page: puppeteer.Page, image: string) {
  await page.waitFor(selector.post.POST_BUTTON);

  console.log('Escolhendo imagem')
  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click(selector.post.POST_BUTTON), // some button that triggers file selection
  ]);
  await fileChooser.accept([resolve("static", "images", image)]);
  console.log('imagem escolhida')
}
