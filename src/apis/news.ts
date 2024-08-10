import {useQuery} from '@tanstack/react-query';
import Config from 'react-native-config';

export const END_POINT =
  'https://newsapi.org/v2/everything?q=tesla&from=2024-07-09&pageSize=100';
export const commonHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'x-api-key': Config.NEW_API_KEY,
  };
};

export const useNewApi = (enabled = true) => {
  return useQuery({
    queryKey: ['new-query'],
    queryFn: async () => {
      const res = await fetch(END_POINT, {
        method: 'GET',
        headers: commonHeaders(),
      });
      return res.json();
    },
    enabled: enabled,
  });
};
