import puppeteer from "puppeteer";
import selector from "../selectors";

export default async function verifyPopUp(page: puppeteer.Page) {
  try {
    await page.waitForSelector(selector.post.TURN_ON_NOTIFICATION, {
      timeout: 3000,
    });
    await page.tap(selector.post.TURN_ON_NOTIFICATION);
  } catch (error) {}
}
