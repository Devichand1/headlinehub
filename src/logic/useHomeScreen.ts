import {useEffect, useRef, useState} from 'react';
import {useNewsApi} from '../apis/news';
import {storage} from '../config/utility';
import {NewsType} from '../types/News';

const useHomeScreen = () => {
  const getPinned = storage.getString('pinned');
  const {data, isLoading, fetchNextPage} = useNewsApi();
  const [pinnedNews, setPinnedNews] = useState(getPinned || null);
  const [news, setNews] = useState<NewsType[]>([]);
  const timerRef = useRef<NodeJS.Timeout>();
  const refreshInterval = 10000;
  const initialNewsCount = 10;

  const handlePin = (item: NewsType) => {
    storage.set('pinned', JSON.stringify(item));
    setPinnedNews(JSON.stringify(item));
  };
  const handleDelete = (itemToDelte: NewsType) => {
    const filteredNews = news.filter(item => item.title !== itemToDelte.title);
    setNews(filteredNews);
  };
  useEffect(() => {
    if (data?.pages[0].articles) {
      setNews(data.pages[0].articles.slice(0, initialNewsCount));
    }
  }, [data]);
  const fetchNextBatch = async () => {
    const currentNewsCount = news.length;
    if (currentNewsCount >= data?.pages[0].articles.length) {
      clearInterval(timerRef.current);
      fetchNextPage();
    } else {
      const newBatchCount = Math.floor(Math.random() * 5) + 1;
      const nextBatch = data?.pages[0]?.articles.slice(
        currentNewsCount,
        currentNewsCount + newBatchCount,
      );
      setNews(prevNews => [...nextBatch, ...prevNews]);
    }
  };

  useEffect(() => {
    startInterval();
    return () => timerRef.current && clearInterval(timerRef.current);
  }, [news]);
  const fetchNextBatchManually = () => {
    clearInterval(timerRef.current);
    fetchNextBatch();
    startInterval();
  };
  const startInterval = () => {
    timerRef.current = setInterval(() => {
      fetchNextBatch();
    }, refreshInterval);
  };

  const handleRemovePinned = () => {
    storage.delete('pinned');
    setPinnedNews(null);
  };

  return {
    data: news,
    pinnedNews: pinnedNews ? JSON.parse(pinnedNews) : null,
    isLoading,
    handlePin,
    handleDelete,
    fetchNextBatchManually,
    handleRemovePinned,
  };
};
export default useHomeScreen;
