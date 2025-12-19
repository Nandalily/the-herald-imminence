import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen, Clock, Target, TrendingUp } from 'lucide-react';

const ReadingProgress = ({ articleId, readTime }) => {
  const [progress, setProgress] = useState(0);
  const [timeSpent, setTimeSpent] = useState(0);
  const [estimatedCompletion, setEstimatedCompletion] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const calculateProgress = useCallback(() => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.scrollY;
    
    if (documentHeight > 0) {
      const calculatedProgress = Math.min(Math.round((scrolled / documentHeight) * 100), 100);
      setProgress(calculatedProgress);
      
      if (readTime && calculatedProgress > 0) {
        const estimatedSecondsSpent = (readTime * 60 * calculatedProgress) / 100;
        setTimeSpent(Math.round(estimatedSecondsSpent / 60));
        
        const remainingSeconds = (readTime * 60) - estimatedSecondsSpent;
        setEstimatedCompletion(Math.max(0, Math.round(remainingSeconds / 60)));
      }
    }
  }, [readTime]);

  useEffect(() => {
    calculateProgress();
    
    const handleScroll = () => {
      calculateProgress();
      if (window.scrollY < 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    const handleResize = () => {
      calculateProgress();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateProgress]);

  const formatTime = (minutes) => {
    if (minutes < 1) return '< 1 min';
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const getProgressColor = () => {
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getReadingInsight = () => {
    if (progress === 0) return 'Start reading to track your progress';
    if (progress < 25) return 'Getting started...';
    if (progress < 50) return 'Making good progress';
    if (progress < 75) return 'More than halfway there!';
    if (progress < 100) return 'Almost finished';
    return 'Article completed! ��';
  };

  if (!isVisible && progress === 0) return null;

  return (
    <div className={`fixed left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${
      isVisible ? 'top-6 opacity-100' : '-top-20 opacity-0'
    }`}>
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-200 p-4 min-w-[320px] max-w-md">
        {/* Main Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <BookOpen size={16} className="text-gray-500" />
              <span className="text-sm font-semibold text-gray-700">Reading Progress</span>
            </div>
            <span className="text-sm font-bold text-primary">{progress}%</span>
          </div>
          
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-300 ${getProgressColor()}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">Beginning</span>
            <span className="text-xs text-gray-500">Complete</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Clock size={14} className="text-gray-500" />
              <span className="text-xs text-gray-600">Time Spent</span>
            </div>
            <p className="text-lg font-bold text-gray-800">{formatTime(timeSpent)}</p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Target size={14} className="text-gray-500" />
              <span className="text-xs text-gray-600">Time Left</span>
            </div>
            <p className="text-lg font-bold text-gray-800">
              {estimatedCompletion > 0 ? formatTime(estimatedCompletion) : 'Done!'}
            </p>
          </div>
        </div>

        {/* Insights */}
        <div className="flex items-center justify-between bg-blue-50 rounded-lg p-3">
          <div className="flex items-center space-x-2">
            <TrendingUp size={14} className="text-blue-600" />
            <span className="text-sm text-blue-700">{getReadingInsight()}</span>
          </div>
          
          {progress < 100 && (
            <button
              onClick={() => {
                window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
              }}
              className="text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 px-3 py-1 rounded-lg transition"
            >
              Skip to end
            </button>
          )}
        </div>

        {/* Quick Navigation Dots */}
        {readTime > 5 && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex justify-between">
              {[0, 25, 50, 75, 100].map((point) => (
                <button
                  key={point}
                  onClick={() => {
                    const targetScroll = (point / 100) * (document.documentElement.scrollHeight - window.innerHeight);
                    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                  }}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs transition-all ${
                    progress >= point 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                  title={`Jump to ${point}%`}
                >
                  {point === 0 ? '⬆' : point}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Close button */}
      <button
        onClick={() => setIsVisible(false)}
        className="absolute -top-2 -right-2 bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-gray-900 transition"
      >
        ×
      </button>
    </div>
  );
};

export default ReadingProgress;
