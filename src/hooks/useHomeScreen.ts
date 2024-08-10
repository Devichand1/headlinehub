import {useEffect, useRef, useState} from 'react';
import {useNewApi} from '../apis/news';
import {storage} from '../config/utility';

const useHomeScreen = () => {
  const {data, isLoading, refetch} = useNewApi(false);
  const getPinned = storage.getString('pinned');
  const getLocalNews = storage.getString('news');
  const [pinnedNews, setPinnedNews] = useState(getPinned);
  const [news, setNews] = useState<any[]>([]);
  const timerRef = useRef<NodeJS.Timeout>();

  const handlePin = (data: any) => {
    storage.set('pinned', JSON.stringify(data));
    setPinnedNews(JSON.stringify(data));
  };
  useEffect(() => {
    if (getLocalNews) {
      const storedNews = JSON.parse(getLocalNews);
      setNews(storedNews.slice(0, 10));
    }
  }, []);
  useEffect(() => {
    // Function to fetch the next batch of news headlines
    const fetchNextBatch = () => {
      const storedNews = JSON.parse(storage.getString('news') || '[]');
      const currentNewsCount = news.length;
      const nextBatch = storedNews.slice(
        currentNewsCount,
        currentNewsCount + 5,
      );
      setNews(prevNews => [...nextBatch, ...prevNews]);
    };

    // Set up the timer to fetch the next batch every 10 seconds
    timerRef.current = setInterval(fetchNextBatch, 10000);

    // Clean up the timer on component unmount
    return () => timerRef.current && clearInterval(timerRef.current);
  }, [news]);
  const fetchNextBatchManually = () => {
    clearInterval(timerRef.current);
    const storedNews = JSON.parse(storage.getString('news') || '[]');
    const currentNewsCount = news.length;
    const nextBatch = storedNews.slice(currentNewsCount, currentNewsCount + 5);
    setNews(prevNews => [...nextBatch, ...prevNews]);
    timerRef.current = setInterval(() => {
      fetchNextBatch();
    }, 10000);
  };

  return {
    data: news,
    pinnedNews: pinnedNews ? JSON.parse(pinnedNews) : null,
    isLoading,
    refetch,
    handlePin,
    fetchNextBatchManually,
  };
};
export default useHomeScreen;
