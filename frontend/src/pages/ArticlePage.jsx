import React from 'react';
import { useParams } from 'react-router-dom';

const ArticlePage = () => {
  const { id } = useParams();
  
  return (
    <div className="py-8 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Article {id}</h1>
      <div className="prose max-w-none">
        <p>Article content will be displayed here...</p>
      </div>
    </div>
  );
};

export default ArticlePage;
