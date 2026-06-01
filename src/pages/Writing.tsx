import { useState } from 'react';
import { Check, FileText, Sparkles, RotateCcw } from 'lucide-react';

const WritingPage = () => {
  const [content, setContent] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [currentTopicIndex, setCurrentTopicIndex] = useState(0);

  const topics = [
    {
      title: 'My Day',
      description: 'Write about your daily routine. What do you do in the morning, afternoon, and evening?',
      wordCount: 100,
      sampleAnswer: 'I wake up at 7 AM every day. I brush my teeth and have breakfast. Then I go to work or school. In the afternoon, I have lunch and take a short break. In the evening, I like to read books or watch TV. I go to bed at 11 PM.'
    },
    {
      title: 'My Favorite Hobby',
      description: 'What is your favorite hobby? Why do you like it? How often do you do it?',
      wordCount: 120,
      sampleAnswer: 'My favorite hobby is reading. I love reading because it takes me to different worlds. I read every night before bed. I enjoy all kinds of books, especially novels and biographies. Reading helps me relax and learn new things.'
    },
    {
      title: 'My Best Friend',
      description: 'Who is your best friend? What do you like about them? What do you do together?',
      wordCount: 100,
      sampleAnswer: 'My best friend is Lisa. She is very kind and funny. We met in school three years ago. We like to go shopping and watch movies together. She always helps me when I have problems. I am very happy to have her as my friend.'
    }
  ];

  const currentTopic = topics[currentTopicIndex];

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const nextTopic = () => {
    if (currentTopicIndex < topics.length - 1) {
      setCurrentTopicIndex(prev => prev + 1);
      setContent('');
      setSubmitted(false);
    }
  };

  const restart = () => {
    setCurrentTopicIndex(0);
    setContent('');
    setSubmitted(false);
  };

  const getSuggestions = () => {
    return [
      'Try to use more descriptive adjectives',
      'Check your verb tenses',
      'Add more details about your feelings',
      'Make sure your sentences are complete'
    ];
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">写作练习</h1>
        <p className="text-gray-600">
          第 {currentTopicIndex + 1} 题 / 共 {topics.length} 题
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="card">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-xl">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{currentTopic.title}</h2>
              <p className="text-gray-500 text-sm">约 {currentTopic.wordCount} 词</p>
            </div>
          </div>
          <p className="text-gray-600 mb-4">{currentTopic.description}</p>

          {submitted && (
            <div className="mt-4 p-4 bg-blue-50 rounded-xl">
              <p className="text-sm text-blue-800 font-medium mb-2">💡 参考范文</p>
              <p className="text-sm text-blue-700">{currentTopic.sampleAnswer}</p>
            </div>
          )}
        </div>

        <div className="card">
          <div className="mb-4 flex justify-between items-center">
            <span className="text-gray-500">
              {content.split(/\s+/).filter(word => word.length > 0).length} / {currentTopic.wordCount} 词
            </span>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={submitted}
            placeholder="Start writing here..."
            className="w-full h-64 p-4 border-2 border-gray-200 rounded-xl resize-none focus:border-primary focus:outline-none transition-colors disabled:opacity-50"
          />

          {!submitted ? (
            <button onClick={handleSubmit} className="btn-primary w-full mt-4">
              提交作文
            </button>
          ) : (
            <div className="mt-4 space-y-4">
              <div className="flex items-center gap-2 p-4 bg-green-50 rounded-xl">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-medium">提交成功！</span>
              </div>

              <div className="p-4 bg-purple-50 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  <span className="text-purple-800 font-medium">AI 建议</span>
                </div>
                <ul className="text-sm text-purple-700 space-y-1">
                  {getSuggestions().map((suggestion, index) => (
                    <li key={index}>• {suggestion}</li>
                  ))}
                </ul>
              </div>

              <button onClick={nextTopic} className="btn-primary w-full">
                {currentTopicIndex < topics.length - 1 ? '下一题' : '查看结果'}
              </button>
            </div>
          )}
        </div>
      </div>

      {currentTopicIndex === topics.length - 1 && submitted && (
        <div className="card text-center py-8 mt-8">
          <h2 className="text-2xl font-display font-bold text-gray-800 mb-4">练习完成！</h2>
          <p className="text-gray-600 mb-6">Great job! You completed all writing exercises.</p>
          <button onClick={restart} className="btn-primary flex items-center gap-2 mx-auto">
            <RotateCcw className="w-5 h-5" />
            再练一次
          </button>
        </div>
      )}
    </div>
  );
};

export default WritingPage;
