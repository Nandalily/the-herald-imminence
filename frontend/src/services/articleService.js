// Mock article data
const mockArticles = [
  {
    id: 1,
    title: 'AI Revolution in Healthcare: Transforming Patient Care',
    excerpt: 'How artificial intelligence is revolutionizing diagnostics, treatment planning, and patient monitoring in modern healthcare systems.',
    content: `Artificial intelligence is fundamentally transforming healthcare delivery across the globe. From early disease detection to personalized treatment plans, AI systems are enhancing medical professionals' capabilities and improving patient outcomes.

## Early Diagnosis and Prevention

Machine learning algorithms can now analyze medical images with accuracy surpassing human experts in certain domains. A recent study published in Nature Medicine demonstrated that AI systems could detect early-stage lung cancer with 94% accuracy from CT scans—six months earlier than traditional methods.

## Personalized Treatment Plans

AI-powered systems analyze vast datasets of patient histories, genetic information, and treatment outcomes to recommend personalized therapies. This approach has shown particular promise in oncology, where treatment response varies significantly between patients.

## Remote Patient Monitoring

Wearable devices integrated with AI algorithms can continuously monitor patients' vital signs and detect anomalies in real-time. This technology has proven especially valuable for managing chronic conditions like diabetes and hypertension.

## Challenges and Ethical Considerations

Despite these advancements, several challenges remain:
- Data privacy and security concerns
- Algorithmic bias in training data
- Integration with existing healthcare systems
- Regulatory approval processes

The future of healthcare lies in the collaboration between human expertise and artificial intelligence, creating a synergistic partnership that enhances rather than replaces medical professionals.`,
    author: {
      id: 101,
      name: 'Dr. Sarah Chen',
      bio: 'Medical AI Researcher at Stanford University',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'
    },
    category: 'Technology',
    tags: ['AI', 'Healthcare', 'Technology', 'Medicine', 'Innovation'],
    readTime: 8,
    publishedDate: '2024-03-15T10:30:00Z',
    updatedDate: '2024-03-16T14:20:00Z',
    coverImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=600&fit=crop',
    stats: {
      views: 12458,
      likes: 892,
      shares: 342,
      comments: 127
    },
    relatedArticles: [2, 3, 4]
  }
];

export const articleService = {
  getArticleById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const article = mockArticles.find(article => article.id === parseInt(id));
    return article || null;
  },

  getRelatedArticles: async (articleIds) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockArticles.filter(article => articleIds.includes(article.id));
  },

  getArticlesByCategory: async (category) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockArticles.filter(article => article.category === category);
  },

  searchArticles: async (query) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const lowercaseQuery = query.toLowerCase();
    return mockArticles.filter(article => 
      article.title.toLowerCase().includes(lowercaseQuery) ||
      article.excerpt.toLowerCase().includes(lowercaseQuery) ||
      article.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  },

  updateArticleStats: async (articleId, updates) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    console.log('Updating article stats:', { articleId, updates });
    return { success: true };
  }
};
