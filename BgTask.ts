import {NewsType} from './src/types/News';

const {END_POINT, commonHeaders} = require('./src/apis/news');
const {storage} = require('./src/config/utility');

export const bgTask = async () => {
  const data = await fetch(END_POINT + '1', {
    method: 'GET',
    headers: commonHeaders(),
  }).then(response => response.json());
  const filterRemoved = data.articles.filter(
    (item: NewsType) => item.url !== 'https://removed.com',
  );
  storage.set('news', JSON.stringify(filterRemoved));
};
