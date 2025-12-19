import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const TTSArticleContent = ({ content, articleId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    h2: ({ node, ...props }) => (
      <h2 className="text-2xl font-bold mt-8 mb-4 text-gray-800 border-l-4 border-primary pl-4" {...props} />
    ),
    h3: ({ node, ...props }) => (
      <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800" {...props} />
    ),
    p: ({ node, ...props }) => (
      <p className="text-gray-700 leading-relaxed mb-4" {...props} />
    ),
    ul: ({ node, ...props }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />
    ),
    ol: ({ node, ...props }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2" {...props} />
    ),
    blockquote: ({ node, ...props }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-6" {...props} />
    ),
    a: ({ node, ...props }) => (
      <a className="text-primary hover:underline" {...props} />
    )
  };

  // For demo: show first 3 paragraphs, then expand
  const paragraphs = content.split('\n\n');
  const previewContent = paragraphs.slice(0, 3).join('\n\n');
  const remainingContent = paragraphs.slice(3).join('\n\n');

  return (
    <div className="prose prose-lg max-w-none">
      {/* Cover Image */}
      <div className="mb-8 rounded-xl overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=600&fit=crop"
          alt="Article cover"
          className="w-full h-auto object-cover"
        />
      </div>

      {/* Article Content */}
      <div className={isExpanded ? '' : 'max-h-96 overflow-hidden relative'}>
        <ReactMarkdown components={components}>
          {isExpanded ? content : previewContent}
        </ReactMarkdown>
        
        {!isExpanded && remainingContent && (
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent flex items-end justify-center">
            <button 
              onClick={() => setIsExpanded(true)}
              className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition shadow-lg"
            >
              Continue Reading ({paragraphs.length - 3} more paragraphs)
            </button>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <div className="flex flex-wrap gap-2">
          {['AI', 'Healthcare', 'Technology', 'Medicine', 'Innovation'].map((tag) => (
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
  );
};

export default TTSArticleContent;
