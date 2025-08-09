import axios from "axios";

export const fetchCryptoNews = async () => {
  const res = await axios.get(
    `https://newsapi.org/v2/everything?q=crypto&language=en&sortBy=publishedAt&pageSize=6&apiKey=c1c8a758da3f47979723c9f05f44567a`
  );
  return res.data.articles;
};
