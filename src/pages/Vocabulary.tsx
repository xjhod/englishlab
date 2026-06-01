import { useState } from 'react';
import { Volume2, Check, X, RotateCcw } from 'lucide-react';

const VocabularyPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const words = [
    { word: 'serendipity', definition: '意外发现珍奇事物的本领', example: 'Finding that old photo was pure serendipity.' },
    { word: 'ephemeral', definition: '短暂的，转瞬即逝的', example: 'The beauty of cherry blossoms is ephemeral.' },
    { word: 'ubiquitous', definition: '无处不在的', example: 'Coffee shops have become ubiquitous in this city.' },
    { word: 'eloquent', definition: '雄辩的，有说服力的', example: 'She gave an eloquent speech.' },
    { word: 'resilient', definition: '有韧性的，能恢复的', example: 'Children are remarkably resilient.' }
  ];

  const currentWord = words[currentIndex];

  const handleKnow = () => {
    setCorrectCount(prev => prev + 1);
    nextWord();
  };

  const handleDontKnow = () => {
    nextWord();
  };

  const nextWord = () => {
    if (currentIndex < words.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowDefinition(false);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setShowDefinition(false);
    setCorrectCount(0);
  };

  const speak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentWord.word);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">单词记忆</h1>
        <p className="text-gray-600">
          进度 {currentIndex + 1} / {words.length} · 已掌握 {correctCount} 个
        </p>
      </div>

      {currentIndex < words.length ? (
        <div className="card">
          <div className="text-center py-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h2 className="text-4xl font-display font-bold text-gray-800">{currentWord.word}</h2>
              <button onClick={speak} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Volume2 className="w-6 h-6 text-primary" />
              </button>
            </div>

            {showDefinition ? (
              <div className="space-y-4 animate-fadeIn">
                <p className="text-xl text-gray-700">{currentWord.definition}</p>
                <p className="text-gray-500 italic">"{currentWord.example}"</p>
              </div>
            ) : (
              <button
                onClick={() => setShowDefinition(true)}
                className="btn-primary"
              >
                查看释义
              </button>
            )}
          </div>

          {showDefinition && (
            <div className="flex gap-4 pt-4 border-t">
              <button
                onClick={handleKnow}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold transition-colors"
              >
                <Check className="w-5 h-5" />
                认识
              </button>
              <button
                onClick={handleDontKnow}
                className="flex-1 flex items-center justify-center gap-2 py-3 px-6 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-colors"
              >
                <X className="w-5 h-5" />
                不认识
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="card text-center py-8">
          <h2 className="text-2xl font-display font-bold text-gray-800 mb-4">太棒了！</h2>
          <p className="text-gray-600 mb-6">
            你完成了这次练习，掌握了 {correctCount} / {words.length} 个单词
          </p>
          <button onClick={restart} className="btn-primary flex items-center gap-2 mx-auto">
            <RotateCcw className="w-5 h-5" />
            再练一次
          </button>
        </div>
      )}
    </div>
  );
};

export default VocabularyPage;
