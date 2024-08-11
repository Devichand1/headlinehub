import {useInfiniteQuery} from '@tanstack/react-query';
import Config from 'react-native-config';
import {storage} from '../config/utility';

export const END_POINT =
  'https://newsapi.org/v2/everything?q=tesla&from=2024-08-09&pageSize=100&page=';
export const commonHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'x-api-key': Config.NEW_API_KEY,
  };
};

const fetchData = async ({pageParam}: {pageParam: Number}) => {
  const cached = storage.getString('news');
  if (cached) {
    return JSON.parse(cached);
  } else {
    const response = await fetch(`${END_POINT}${pageParam}`, {
      headers: commonHeaders(),
    });
    const data = await response.json();
    storage.set('news', JSON.stringify(data));
    return data;
  }
};

export const useNewsApi = () => {
  return useInfiniteQuery({
    queryKey: ['apireq'],
    queryFn: fetchData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (!lastPage || lastPage.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
  });
};