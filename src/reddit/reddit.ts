import axios from "axios";
import config from "../config";

export async function getRedditPosts() {
  const subreddit =
    config.subreddit[Math.floor(Math.random() * config.subreddit.length)];

  const url = await `https://www.reddit.com/r/${subreddit}/.json`;
  const response = await axios.get(url);
  const posts = await response.data.data.children;

  const postsData = posts.map((post: any) => {
    const {
      title,
      author,
      subreddit_name_prefixed: subreddit,
      url: imageLink,
    } = post.data;

    const postData = {
      title,
      author,
      subreddit,
      imageLink,
    };

    return postData;
  });
  // console.log(postsData)
  return postsData;
}

