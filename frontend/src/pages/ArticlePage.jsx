import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ArticleHeader from '../components/article/ArticleHeader';
import ArticleSidebar from '../components/article/ArticleSidebar';
import CommentsSection from '../components/article/CommentsSection';
import ReadingProgress from '../components/article/ReadingProgress';
import { articleService } from '../services/articleService';
import { ArrowLeft, Loader, BookOpen, BarChart } from 'lucide-react';

const ArticlePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readingStats, setReadingStats] = useState({
    progress: 0,
    timeSpent: 0,
    wordsRead: 0
  });

  const updateReadingStats = useCallback((scrollPosition) => {
    if (!article) return;
    
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const progress = Math.min(Math.round((scrollPosition / documentHeight) * 100), 100);
    
    const totalWords = article.content.split(/\s+/).length;
    const wordsRead = Math.round((progress / 100) * totalWords);
    
    const estimatedTime = Math.round((progress / 100) * article.readTime);
    
    setReadingStats({
      progress,
      timeSpent: estimatedTime,
      wordsRead
    });

    if (progress > 10 && progress % 25 === 0) {
      const readingHistory = JSON.parse(localStorage.getItem('readingHistory') || '[]');
      const existingIndex = readingHistory.findIndex(item => item.articleId === id);
      
      if (existingIndex >= 0) {
        readingHistory[existingIndex] = {
          ...readingHistory[existingIndex],
          progress,
          lastRead: new Date().toISOString(),
          timeSpent: readingHistory[existingIndex].timeSpent + 1
        };
      } else {
        readingHistory.push({
          articleId: id,
          articleTitle: article.title,
          progress,
          lastRead: new Date().toISOString(),
          timeSpent: 1,
          category: article.category
        });
      }
      
      localStorage.setItem('readingHistory', JSON.stringify(readingHistory));
    }
  }, [article, id]);

  useEffect(() => {
    const handleScroll = () => {
      updateReadingStats(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateReadingStats]);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const data = await articleService.getArticleById(id);
        if (data) {
          setArticle(data);
          
          await articleService.updateArticleStats(id, { views: data.stats.views + 1 });
          
          const readingHistory = JSON.parse(localStorage.getItem('readingHistory') || '[]');
          const savedProgress = readingHistory.find(item => item.articleId === id);
          if (savedProgress) {
            setReadingStats({
              progress: savedProgress.progress,
              timeSpent: savedProgress.timeSpent,
              wordsRead: Math.round((savedProgress.progress / 100) * data.content.split(/\s+/).length)
            });
          }
        } else {
          setError('Article not found');
        }
      } catch (err) {
        setError('Failed to load article');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin text-primary" size={48} />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Article Not Found</h2>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const getReadingInsights = () => {
    const totalWords = article.content.split(/\s+/).length;
    const wordsPerMinute = 200;
    const estimatedTotalTime = Math.ceil(totalWords / wordsPerMinute);
    const timeLeft = Math.max(0, estimatedTotalTime - readingStats.timeSpent);
    
    return {
      totalWords,
      estimatedTotalTime,
      timeLeft,
      readingSpeed: Math.round(readingStats.wordsRead / Math.max(1, readingStats.timeSpent / 60))
    };
  };

  const insights = getReadingInsights();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Reading Progress Indicator */}
      <ReadingProgress 
        articleId={id}
        readTime={article.readTime}
      />

      {/* Reading Stats Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 z-40 lg:hidden">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <BookOpen size={14} className="text-gray-500" />
                <span className="text-sm font-medium">{readingStats.progress}%</span>
              </div>
              <div className="flex items-center space-x-2">
                <BarChart size={14} className="text-gray-500" />
                <span className="text-sm">{insights.timeLeft} min left</span>
              </div>
            </div>
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${readingStats.progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Back Navigation */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-primary transition"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Articles
          </button>
        </div>
      </div>

      {/* Article Container */}
      <div className="container mx-auto px-4 py-8 pb-20 lg:pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Article Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <ArticleHeader article={article} />
              
              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                {/* Cover Image */}
                <div className="mb-8 rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=600&fit=crop"
                    alt="Article cover"
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Content */}
                <div className="text-gray-700 leading-relaxed space-y-4">
                  {article.content.split('\n\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>

                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Reading Completion Banner */}
              {readingStats.progress >= 95 && (
                <div className="mt-8 p-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white text-center">
                  <div className="flex items-center justify-center space-x-3 mb-3">
                    <BookOpen size={24} />
                    <h3 className="text-xl font-bold">Article Completed! 🎉</h3>
                  </div>
                  <p className="mb-4">
                    You've spent approximately {readingStats.timeSpent} minutes reading this article.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button 
                      onClick={() => navigate('/articles')}
                      className="px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition"
                    >
                      Read Another Article
                    </button>
                    <button 
                      onClick={() => {
                        const commentsSection = document.querySelector('.comments-section');
                        commentsSection?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="px-6 py-3 bg-white text-emerald-700 hover:bg-gray-100 rounded-lg transition"
                    >
                      Share Your Thoughts
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Comments Section */}
            <div className="comments-section mt-8">
              <CommentsSection articleId={id} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <ArticleSidebar 
                stats={article.stats}
                author={article.author}
              />
              
              {/* Reading Stats Card */}
              <div className="bg-white rounded-xl shadow-md p-6 mt-6">
                <h3 className="font-bold text-lg mb-4 flex items-center">
                  <BookOpen className="mr-2" size={20} />
                  Your Reading Stats
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-semibold">{readingStats.progress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-300"
                        style={{ width: `${readingStats.progress}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Time Spent</p>
                      <p className="font-bold">{readingStats.timeSpent} min</p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-xs text-gray-500">Words Read</p>
                      <p className="font-bold">{readingStats.wordsRead.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <p>Estimated reading speed: <span className="font-semibold">{insights.readingSpeed} wpm</span></p>
                    <p className="mt-1">Time remaining: <span className="font-semibold">{insights.timeLeft} minutes</span></p>
                  </div>
                  
                  <button
                    onClick={() => {
                      const targetScroll = (readingStats.progress / 100) * 
                        (document.documentElement.scrollHeight - window.innerHeight);
                      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
                    }}
                    className="w-full py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
                  >
                    Continue Reading
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Articles Preview */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">More from {article.category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm mb-3">
                    {article.category}
                  </span>
                  <h3 className="font-bold text-lg mb-2 hover:text-primary cursor-pointer">
                    Related Article Title {i}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Brief description of the related article goes here...
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">5 min read</span>
                    <button className="text-primary text-sm hover:underline">
                      Read →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
