import puppeteer from "puppeteer";
import selector from "./selectors";
import dotenv from "dotenv";
const { resolve } = require("path");
const iPhone = puppeteer.devices["iPhone 6"];
import ora from "ora";
dotenv.config();
// import fs from "fs";
// import config from "./config";
// import selectors from "./selectors";

const spinnerInit = ora("Iniciando").start();

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
    spinnerInit.fail();
    throw new Error("Invalid name or password");
  }

  await page.goto("https://www.instagram.com/accounts/login/");

  spinnerInit.succeed();
  const spinnerLogin = ora("Iniciando login").start();
  spinnerLogin.text = "Carregando Tela de Login";

  await page.waitFor(selector.login.USERNAME);
  await page.waitFor(selector.login.PASSWORD);
  await page.waitFor(selector.login.LOGIN_BUTTON);

  spinnerLogin.text = "Login: Carregando username";
  await page.tap(selector.login.USERNAME);
  await page.keyboard.type(username);

  spinnerLogin.text = "Login: Carregando password";
  await page.tap(selector.login.PASSWORD);
  await page.keyboard.type(password);

  spinnerLogin.text = "Logando";
  await page.tap(selector.login.LOGIN_BUTTON);

  //

  await page.waitFor(selector.login.LOGIN_SAVE);
  await page.tap(selector.login.LOGIN_SAVE);

  await page.waitFor(selector.login.HOME_SCREEN);
  await page.tap(selector.login.HOME_SCREEN);

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
  spinnerPost.text = "Escolhendo imagem";

  await page.waitFor(selector.post.POST_BUTTON);

  const [fileChooser] = await Promise.all([
    page.waitForFileChooser(),
    page.click(selector.post.POST_BUTTON), // some button that triggers file selection
  ]);
  await fileChooser.accept([resolve("images", image)]);
  spinnerPost.text = "Postando imagem";

  await page.waitFor(selector.post.POST_NEXT);
  await page.tap(selector.post.POST_NEXT);

  await page.waitFor(selector.post.POST_DESCRIPTION);
  await page.tap(selector.post.POST_DESCRIPTION);
  await page.keyboard.type(description);

  await page.waitFor(selector.post.POST_SHARE);
  await page.tap(selector.post.POST_SHARE);
  
  await page.waitFor(selector.post.TURN_ON_NOTIFICATION);
  await page.tap(selector.post.TURN_ON_NOTIFICATION);

  spinnerPost.text = "Imagem postada :)";
  spinnerPost.succeed();
}

export function close() {
  
}
