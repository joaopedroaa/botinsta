import { init, login, post } from "./instagram";

const postData = {
  image: "image.jpg",
  description: "post feito 100% pro um bot :)",
};

(async () => {
  const initCache = await init(true);

  const loginCache = await login(
    initCache,
    process.env.USERNAME,
    process.env.PASSWORD
  );

  const postCache = await post(
    loginCache,
    postData.image,
    postData.description
  );
  
})();
