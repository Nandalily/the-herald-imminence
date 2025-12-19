import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, MoreVertical } from 'lucide-react';

const CommentsSection = ({ articleId }) => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: {
        name: 'Alex Johnson',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
        role: 'Medical Student'
      },
      content: 'This article perfectly captures the current state of AI in healthcare. The ethical considerations section was particularly insightful.',
      timestamp: '2 hours ago',
      likes: 42,
      replies: [
        {
          id: 11,
          user: {
            name: 'Dr. Chen',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chen',
            role: 'Author'
          },
          content: 'Thank you, Alex! I agree that ethics should be at the forefront of these discussions.',
          timestamp: '1 hour ago',
          likes: 15
        }
      ]
    },
    {
      id: 2,
      user: {
        name: 'Maria Rodriguez',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
        role: 'Healthcare AI Researcher'
      },
      content: 'The section on remote monitoring could have included more about regulatory challenges. Overall, great overview!',
      timestamp: '4 hours ago',
      likes: 28,
      replies: []
    }
  ]);

  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: comments.length + 1,
      user: {
        name: 'Current User',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=User',
        role: 'Reader'
      },
      content: newComment,
      timestamp: 'Just now',
      likes: 0,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center">
          <MessageSquare className="mr-2" />
          Discussion ({comments.reduce((acc, comment) => acc + 1 + comment.replies.length, 0)})
        </h2>
        <select className="px-3 py-2 border border-gray-300 rounded-lg">
          <option>Most Relevant</option>
          <option>Newest First</option>
          <option>Most Liked</option>
        </select>
      </div>

      {/* New Comment Form */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="flex space-x-4">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
              alt="Your avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-grow">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Share your thoughts on this article..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows="3"
            />
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition"
              >
                Post Comment
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img 
                    src={comment.user.avatar}
                    alt={comment.user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold">{comment.user.name}</h4>
                    <p className="text-sm text-gray-500">{comment.user.role} • {comment.timestamp}</p>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical size={20} />
                  </button>
                </div>
                <p className="text-gray-700 mb-4">{comment.content}</p>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-primary">
                    <ThumbsUp size={18} />
                    <span>Like ({comment.likes})</span>
                  </button>
                  <button className="text-gray-600 hover:text-primary">
                    Reply
                  </button>
                </div>

                {/* Replies */}
                {comment.replies.length > 0 && (
                  <div className="mt-4 ml-12 space-y-4">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="w-8 h-8 rounded-full overflow-hidden">
                            <img 
                              src={reply.user.avatar}
                              alt={reply.user.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h5 className="font-semibold text-sm">{reply.user.name}</h5>
                            <p className="text-xs text-gray-500">{reply.timestamp}</p>
                          </div>
                        </div>
                        <p className="text-sm text-gray-700">{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsSection;
