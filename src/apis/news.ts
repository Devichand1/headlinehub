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

export const getNextBatchPage = async (page: number) => {
  const res = await fetch(END_POINT + page, {
    method: 'GET',
    headers: commonHeaders(),
  });
  return res.json();
};
const fetchData = async ({pageParam}: {pageParam: Number}) => {
  const cached = storage.getString('news');
  if (cached) {
    console.log('cached data');
    return JSON.parse(cached);
  } else {
    const response = await fetch(`${END_POINT}${pageParam}`, {
      headers: commonHeaders(),
    });
    console.log('fetched data');
    const data = await response.json();
    storage.set('news', JSON.stringify(data));
    return data;
  }
};

export const useNewsApi = () => {
  return useInfiniteQuery({
    queryKey: ['jobs'],
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

// const fetchJobs = async ({pageParam}: {pageParam: Number}) => {
//   trackEvent('fetchJobs', {page: pageParam});
//   const cachedDataKey = `cachedData_page_${pageParam}`;
//   const cachedTimeKey = `lastFetchedTime_page_${pageParam}`;

//   const cachedData = storage.getString(cachedDataKey);
//   const lastFetchedAt = storage.getString(cachedTimeKey);

//   const isCacheValid =
//     lastFetchedAt &&
//     new Date().getTime() - parseInt(lastFetchedAt, 10) < CACHE_DURATION;

//   if (cachedData && isCacheValid) {
//     return JSON.parse(cachedData);
//   } else {
//     const response = await fetch(`${END_POINT}?page=${pageParam}`);
//     const data = await response.json();
//     if (data?.results?.length === 0) {
//       return null;
//     }
//     storage.set(cachedDataKey, JSON.stringify(data));
//     storage.set(cachedTimeKey, new Date().getTime().toString());
//     return data;
//   }
// };

// export const useHomePageApi = () => {
//   return useInfiniteQuery({
//     queryKey: ['jobs'],
//     queryFn: fetchJobs,
//     initialPageParam: 1,
//     getNextPageParam: (lastPage, allPages, lastPageParam) => {
//       if (!lastPage || lastPage.length === 0) {
//         return undefined;
//       }
//       return lastPageParam + 1;
//     },
//   });
// };
