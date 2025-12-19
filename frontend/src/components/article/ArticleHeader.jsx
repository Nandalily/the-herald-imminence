import React, { useState } from 'react';
import { 
  Calendar, Clock, Eye, Share2, Bookmark, User, Headphones,
  Twitter, Facebook, Linkedin, Copy, Check, MoreHorizontal
} from 'lucide-react';

const ArticleHeader = ({ article }) => {
  const [isCopied, setIsCopied] = useState(false);
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isTTSAvailable = 'speechSynthesis' in window;

  const handleTTSButton = () => {
    const ttsButton = document.querySelector('[data-tts-button]');
    if (ttsButton) {
      ttsButton.click();
    } else {
      alert('Click the headphones button in the bottom right to listen to this article.');
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  return (
    <div className="mb-8">
      {/* Category Badge */}
      <div className="mb-4">
        <span className="inline-block px-4 py-2 bg-primary text-white rounded-full font-semibold">
          {article.category}
        </span>
      </div>

      {/* Article Title */}
      <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
        {article.title}
      </h1>

      {/* Article Meta */}
      <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            <img 
              src={article.author.avatar} 
              alt={article.author.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-gray-800">{article.author.name}</p>
            <p className="text-sm">{article.author.bio}</p>
          </div>
        </div>

        <div className="flex items-center space-x-6 ml-auto">
          <div className="flex items-center space-x-2">
            <Calendar size={18} />
            <span>{formatDate(article.publishedDate)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock size={18} />
            <span>{article.readTime} min read</span>
          </div>
          <div className="flex items-center space-x-2">
            <Eye size={18} />
            <span>{article.stats.views.toLocaleString()} views</span>
          </div>
        </div>
      </div>

      {/* Action Buttons - Primary Row */}
      <div className="flex flex-wrap items-center gap-4 py-4 border-y border-gray-200">
        {/* Like Button */}
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition group">
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          <span>Like ({article.stats.likes})</span>
        </button>
        
        {/* Save Button */}
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
          <Bookmark size={20} />
          <span>Save</span>
        </button>
        
        {/* Quick Share Buttons */}
        <div className="flex items-center space-x-2">
          <button
            onClick={handleNativeShare}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <Share2 size={20} />
            <span>Share ({article.stats.shares})</span>
          </button>
          
          {/* Quick Platform Buttons */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`, '_blank')}
              className="p-2 bg-[#1DA1F2] text-white rounded-lg hover:bg-[#1a8cd8] transition"
              title="Share on Twitter"
            >
              <Twitter size={18} />
            </button>
            <button
              onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
              className="p-2 bg-[#1877F2] text-white rounded-lg hover:bg-[#166fe5] transition"
              title="Share on Facebook"
            >
              <Facebook size={18} />
            </button>
            <button
              onClick={handleCopyLink}
              className={`p-2 rounded-lg transition ${
                isCopied
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-800 text-white hover:bg-gray-900'
              }`}
              title={isCopied ? 'Copied!' : 'Copy Link'}
            >
              {isCopied ? <Check size={18} /> : <Copy size={18} />}
            </button>
          </div>
        </div>
        
        {/* TTS Button */}
        {isTTSAvailable && (
          <button 
            onClick={handleTTSButton}
            className="flex items-center space-x-2 px-4 py-2 border border-blue-300 text-blue-700 bg-blue-50 rounded-lg hover:bg-blue-100 transition ml-auto"
            data-tts-button
          >
            <Headphones size={20} />
            <span>Listen</span>
          </button>
        )}
      </div>

      {/* More Sharing Options Dropdown */}
      <div className="mt-4">
        <button
          onClick={handleNativeShare}
          className="flex items-center text-gray-600 hover:text-primary transition"
        >
          <MoreHorizontal size={18} className="mr-2" />
          <span className="text-sm">More sharing options</span>
        </button>
      </div>
    </div>
  );
};

export default ArticleHeader;
