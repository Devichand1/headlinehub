import {useEffect, useRef, useState} from 'react';
import {getNextBatchPage} from '../apis/news';
import {storage} from '../config/utility';

const useHomeScreen = () => {
  const getPinned = storage.getString('pinned');
  const getLocalNews = storage.getString('news');
  const storedNews = JSON.parse(getLocalNews || '[]');
  const [pinnedNews, setPinnedNews] = useState(getPinned || null);
  const [news, setNews] = useState<any[]>([]);
  const timerRef = useRef<NodeJS.Timeout>();
  const currentPage = useRef(1);

  const handlePin = (data: any) => {
    storage.set('pinned', JSON.stringify(data));
    setPinnedNews(JSON.stringify(data));
  };
  const handleDelete = (data: any) => {
    const filteredNews = news.filter(item => item.title !== data.title);
    setNews(filteredNews);
  };
  useEffect(() => {
    if (getLocalNews) {
      setNews(storedNews.slice(0, 10));
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
      const nextBatch = storedNews.slice(
        currentNewsCount,
        currentNewsCount + 10,
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
    }, 10000);
  };

  const handleRemovePinned = () => {
    storage.delete('pinned');
    setPinnedNews(null);
  }

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
