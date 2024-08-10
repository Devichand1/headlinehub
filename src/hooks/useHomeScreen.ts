import {useEffect, useRef, useState} from 'react';
import {getNextBatchPage} from '../apis/news';
import {storage} from '../config/utility';
import {NewsType} from '../types/News';

const useHomeScreen = () => {
  const getPinned = storage.getString('pinned');
  const getLocalNews = storage.getString('news');
  const storedNews = JSON.parse(getLocalNews || '[]');
  const [pinnedNews, setPinnedNews] = useState(getPinned || null);
  const [news, setNews] = useState<NewsType[]>([]);
  const timerRef = useRef<NodeJS.Timeout>();
  const currentPage = useRef(1);
  const refreshInterval = 10000;
  const initialNewsCount = 10;

  const handlePin = (data: NewsType) => {
    storage.set('pinned', JSON.stringify(data));
    setPinnedNews(JSON.stringify(data));
  };
  const handleDelete = (data: NewsType) => {
    const filteredNews = news.filter(item => item.title !== data.title);
    setNews(filteredNews);
  };
  useEffect(() => {
    if (getLocalNews) {
      setNews(storedNews.slice(0, initialNewsCount));
    }
  }, []);
  const fetchNextBatch = async () => {
    const currentNewsCount = news.length;
    if (currentNewsCount >= storedNews.length) {
      clearInterval(timerRef.current);
      currentPage.current += 1;
      const newData = await getNextBatchPage(currentPage.current);
      newData.then(e => {
        storage.set('news', JSON.stringify(e.articles));
        setNews(e.articles.slice(0, 10));
      });
    } else {
      const newBatchCount = Math.floor(Math.random() * 5) + 1;
      const nextBatch = storedNews.slice(
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
    handlePin,
    handleDelete,
    fetchNextBatchManually,
    handleRemovePinned,
  };
};
export default useHomeScreen;
