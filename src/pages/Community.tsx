import { useState } from 'react';
import { Heart, MessageCircle, Share2, Send, User } from 'lucide-react';

const CommunityPage = () => {
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>({});
  const [newPost, setNewPost] = useState('');

  const initialPosts = [
    {
      id: 1,
      user: 'LearningEnthusiast',
      avatar: '👩',
      content: 'Just passed my PET exam! So happy with my progress. Thanks to everyone in this community for the support! 🎉',
      likes: 42,
      comments: ['Congratulations! 🎊', 'Great job!', 'So inspiring!'],
      time: '2 hours ago',
      liked: false
    },
    {
      id: 2,
      user: 'EnglishStudent2024',
      avatar: '👨',
      content: 'What\'s the best way to practice speaking English when you don\'t have a partner? Share your tips! 💬',
      likes: 28,
      comments: ['Try shadowing technique!', 'Watch TV shows with subtitles', 'Language exchange apps!'],
      time: '5 hours ago',
      liked: true
    },
    {
      id: 3,
      user: 'GrammarMaster',
      avatar: '🧑',
      content: 'Just learned the difference between affect and effect. English grammar is tricky but interesting! 📚',
      likes: 15,
      comments: ['Same here!', 'Good job!'],
      time: '1 day ago',
      liked: false
    }
  ];

  const [posts, setPosts] = useState(initialPosts);

  const toggleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const addComment = (postId: number) => {
    const comment = commentInputs[postId];
    if (comment && comment.trim()) {
      setPosts(posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, comment]
          };
        }
        return post;
      }));
      setCommentInputs({ ...commentInputs, [postId]: '' });
    }
  };

  const handleSubmitPost = () => {
    if (newPost && newPost.trim()) {
      const post = {
        id: Date.now(),
        user: 'You',
        avatar: '😊',
        content: newPost,
        likes: 0,
        comments: [],
        time: 'Just now',
        liked: false
      };
      setPosts([post, ...posts]);
      setNewPost('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">社区</h1>
        <p className="text-gray-600">与其他英语学习者交流分享</p>
      </div>

      <div className="card">
        <div className="flex items-start gap-4">
          <div className="text-3xl">😊</div>
          <div className="flex-1">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="分享你的学习心得..."
              className="w-full p-3 border border-gray-200 rounded-xl resize-none focus:border-primary focus:outline-none transition-colors"
              rows={3}
            />
            <div className="flex justify-end mt-3">
              <button
                onClick={handleSubmitPost}
                disabled={!newPost.trim()}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                发布
              </button>
            </div>
          </div>
        </div>
      </div>

      {posts.map(post => (
        <div key={post.id} className="card">
          <div className="flex items-start gap-4">
            <div className="text-3xl">{post.avatar}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-gray-800">{post.user}</span>
                <span className="text-gray-400 text-sm">·</span>
                <span className="text-gray-400 text-sm">{post.time}</span>
              </div>
              <p className="text-gray-700 mb-4">{post.content}</p>

              <div className="flex items-center gap-6">
                <button
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-2 transition-colors ${
                    post.liked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${post.liked ? 'fill-current' : ''}`} />
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span>{post.comments.length}</span>
                </button>
                <button className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {post.comments.length > 0 && (
                <div className="mt-4 space-y-2">
                  {post.comments.map((comment, index) => (
                    <div key={index} className="bg-gray-50 p-3 rounded-xl">
                      <p className="text-gray-700 text-sm">{comment}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-4 flex items-center gap-2">
                <input
                  type="text"
                  value={commentInputs[post.id] || ''}
                  onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                  placeholder="写评论..."
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-xl text-sm focus:border-primary focus:outline-none transition-colors"
                  onKeyPress={(e) => e.key === 'Enter' && addComment(post.id)}
                />
                <button
                  onClick={() => addComment(post.id)}
                  className="p-2 text-primary hover:text-secondary transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommunityPage;
