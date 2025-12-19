import { useState, useEffect, useCallback } from 'react';

const useReadingStats = (articleId, readTime) => {
  const [stats, setStats] = useState({
    progress: 0,
    timeSpent: 0,
    lastReadPosition: 0,
    isReading: false,
    startTime: null,
    wordsRead: 0
  });

  const [sessionStats, setSessionStats] = useState({
    totalReadingTime: 0,
    articlesRead: 0,
    averageSpeed: 0
  });

  // Calculate reading speed (words per minute)
  const calculateReadingSpeed = useCallback((words, minutes) => {
    if (minutes === 0) return 0;
    return Math.round(words / minutes);
  }, []);

  // Save reading session to localStorage
  const saveReadingSession = useCallback((articleId, duration, progress) => {
    const sessions = JSON.parse(localStorage.getItem('readingSessions') || '[]');
    sessions.push({
      articleId,
      date: new Date().toISOString(),
      duration,
      progress,
      completed: progress >= 95
    });
    localStorage.setItem('readingSessions', JSON.stringify(sessions.slice(-50))); // Keep last 50 sessions
  }, []);

  // Update reading progress
  const updateProgress = useCallback((scrollPosition, totalHeight) => {
    if (totalHeight === 0) return 0;
    const progress = Math.min(Math.round((scrollPosition / totalHeight) * 100), 100);
    return progress;
  }, []);

  // Estimate words read based on progress
  const estimateWordsRead = useCallback((progress, totalWords) => {
    return Math.round((progress / 100) * totalWords);
  }, []);

  // Start reading session
  const startReading = useCallback(() => {
    setStats(prev => ({
      ...prev,
      isReading: true,
      startTime: Date.now()
    }));
  }, []);

  // Pause reading session
  const pauseReading = useCallback(() => {
    if (stats.startTime) {
      const duration = Math.round((Date.now() - stats.startTime) / 1000); // seconds
      setSessionStats(prev => ({
        ...prev,
        totalReadingTime: prev.totalReadingTime + duration
      }));
    }
    
    setStats(prev => ({
      ...prev,
      isReading: false,
      startTime: null
    }));
  }, [stats.startTime]);

  // Reset reading session
  const resetReading = useCallback(() => {
    setStats({
      progress: 0,
      timeSpent: 0,
      lastReadPosition: 0,
      isReading: false,
      startTime: null,
      wordsRead: 0
    });
  }, []);

  // Get reading insights
  const getInsights = useCallback(() => {
    const sessions = JSON.parse(localStorage.getItem('readingSessions') || '[]');
    const articleSessions = sessions.filter(s => s.articleId === articleId);
    
    return {
      totalSessions: sessions.length,
      articleSessions: articleSessions.length,
      averageProgress: articleSessions.length > 0 
        ? Math.round(articleSessions.reduce((acc, s) => acc + s.progress, 0) / articleSessions.length)
        : 0,
      completionRate: articleSessions.length > 0
        ? Math.round((articleSessions.filter(s => s.completed).length / articleSessions.length) * 100)
        : 0
    };
  }, [articleId]);

  // Auto-save progress
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (stats.progress > 10) {
        saveReadingSession(articleId, stats.timeSpent, stats.progress);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [articleId, stats.progress, stats.timeSpent, saveReadingSession]);

  return {
    stats,
    sessionStats,
    updateProgress,
    startReading,
    pauseReading,
    resetReading,
    getInsights,
    calculateReadingSpeed,
    estimateWordsRead
  };
};

export default useReadingStats;
