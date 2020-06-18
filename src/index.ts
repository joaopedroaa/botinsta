import { init, login, post } from "./instagram";

const postData1 = {
  image: "image1.png",
  description: "post feito ",
};
// const postData2 = {
//   image: "image2.jpg",
//   description: "post feito 100% ",
// };
// const postData3 = {
//   image: "image3.jpg",
//   description: "post feito 100% por um bot :)",
// };

(async () => {
  const initCache = await init(true);

  const loginCache = await login(
    initCache,
    process.env.USERNAME,
    process.env.PASSWORD
  );

  await post(loginCache, postData1.image, postData1.description);
  // await post(loginCache, postData2.image, postData3.description);
  // await post(loginCache, postData3.image, postData2.description);
})();
