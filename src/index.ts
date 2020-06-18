import { init, login, post } from "./instagram";

async function exec() {
  const initCache = await init(true);
  const loginCache = await login(
    initCache,
    process.env.USERNAME,
    process.env.PASSWORD
  );
  const postCache = await post(loginCache, "image.jpg");
}

exec();
