import Config from 'react-native-config';

export const END_POINT =
  'https://newsapi.org/v2/everything?q=tesla&from=2024-07-09&pageSize=100&page=';
export const commonHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'x-api-key': Config.NEW_API_KEY,
  };
};

export const getNextBatchPage = async (page: number) => {
  const res = await fetch(END_POINT + page, {
    method: 'GET',
    headers: commonHeaders(),
  });
  console.log('====================================');
  console.log('Fetching Next Batch');
  console.log('====================================');
  return res.json();
};
