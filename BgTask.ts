import {NewsType} from './src/types/News';

const {END_POINT, commonHeaders} = require('./src/api/news');
const {storage} = require('./src/config/utility');

export const bgTask = async () => {
  const data = await fetch(END_POINT + '1', {
    method: 'GET',
    headers: commonHeaders(),
  }).then(response => response.json());
  // filter out the news with url 'https://removed.com'
  const filterRemoved = data.articles.filter(
    (item: NewsType) => item.url !== 'https://removed.com',
  );
  const payloadToStore = {articles: filterRemoved};
  storage.set('news', JSON.stringify(payloadToStore));
};
