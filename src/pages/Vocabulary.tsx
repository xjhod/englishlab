import { useState, useEffect } from 'react';
import { Volume2, Check, X, RotateCcw, ArrowLeft, BarChart3 } from 'lucide-react';
import { wordCategories, WordCategory, Word } from '../data/vocabulary';

const VocabularyPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<WordCategory | null>(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [showDefinition, setShowDefinition] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [mastery, setMastery] = useState<Record<string, Record<string, number>>>({});
  const [mode, setMode] = useState<'select' | 'study' | 'result'>('select');

  const currentWords = selectedCategory?.words || [];
  const currentWord = currentWords[currentWordIndex];

  useEffect(() => {
    const savedMastery = localStorage.getItem('wordMastery');
    if (savedMastery) {
      setMastery(JSON.parse(savedMastery));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wordMastery', JSON.stringify(mastery));
  }, [mastery]);

  const updateMastery = (word: string, categoryId: string, knew: boolean) => {
    setMastery(prev => {
      const categoryMastery = prev[categoryId] || {};
      const currentLevel = categoryMastery[word] || 0;
      const newLevel = knew ? Math.min(currentLevel + 1, 5) : Math.max(currentLevel - 1, 0);
      return {
        ...prev,
        [categoryId]: {
          ...categoryMastery,
          [word]: newLevel
        }
      };
    });
  };

  const getMasteryColor = (word: string) => {
    if (!selectedCategory) return '';
    const level = mastery[selectedCategory.id]?.[word] || 0;
    if (level >= 4) return 'bg-green-100 border-green-500';
    if (level >= 2) return 'bg-yellow-100 border-yellow-500';
    return 'bg-red-100 border-red-500';
  };

  const getMasteryText = (level: number) => {
    if (level >= 4) return '已掌握';
    if (level >= 2) return '学习中';
    return '未掌握';
  };

  const handleKnow = () => {
    if (!currentWord || !selectedCategory) return;
    updateMastery(currentWord.word, selectedCategory.id, true);
    setCorrectCount(prev => prev + 1);
    nextWord();
  };

  const handleDontKnow = () => {
    if (!currentWord || !selectedCategory) return;
    updateMastery(currentWord.word, selectedCategory.id, false);
    nextWord();
  };

  const nextWord = () => {
    if (currentWordIndex < currentWords.length - 1) {
      setCurrentWordIndex(prev => prev + 1);
      setShowDefinition(false);
    } else {
      setMode('result');
    }
  };

  const startCategory = (category: WordCategory) => {
    setSelectedCategory(category);
    setCurrentWordIndex(0);
    setShowDefinition(false);
    setCorrectCount(0);
    setMode('study');
  };

  const restart = () => {
    if (!selectedCategory) return;
    setCurrentWordIndex(0);
    setShowDefinition(false);
    setCorrectCount(0);
    setMode('study');
  };

  const backToCategories = () => {
    setMode('select');
    setSelectedCategory(null);
    setCurrentWordIndex(0);
    setShowDefinition(false);
    setCorrectCount(0);
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const getCategoryProgress = (categoryId: string) => {
    const words = wordCategories.find(c => c.id === categoryId)?.words || [];
    const categoryMastery = mastery[categoryId] || {};
    const total = words.length;
    const known = words.filter(w => categoryMastery[w.word] >= 4).length;
    return { known, total };
  };

  if (mode === 'select') {
    return (
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-2">单词记忆</h1>
        <p className="text-gray-600 text-center mb-8">选择一个单词类型开始学习</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wordCategories.map((category) => {
            const progress = getCategoryProgress(category.id);
            const progressPercent = Math.round((progress.known / progress.total) * 100);
            return (
              <button
                key={category.id}
                onClick={() => startCategory(category)}
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg border-2 border-gray-100 hover:border-blue-500 transition-all text-left"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-medium">{category.words.length} 个单词</span>
                  <span className="text-sm text-gray-500">{progress.known}/{progress.total} 已掌握</span>
                </div>
                <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            学习进度总览
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {wordCategories.map(category => {
              const progress = getCategoryProgress(category.id);
              return (
                <div key={category.id} className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-800">{category.name}</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {Math.round((progress.known / progress.total) * 100)}%
                  </p>
                  <p className="text-sm text-gray-500">{progress.known}/{progress.total}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (mode === 'result') {
    const totalWords = currentWords.length;
    const accuracy = Math.round((correctCount / totalWords) * 100);
    return (
      <div className="max-w-2xl mx-auto py-8">
        <button onClick={backToCategories} className="text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-2">
          <ArrowLeft className="w-5 h-5" />
          返回选择
        </button>
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">学习完成！</h2>
          <div className="mb-6">
            <div className="text-6xl font-bold text-blue-600 mb-2">{accuracy}%</div>
            <p className="text-gray-600">正确率</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-green-600">{correctCount}</div>
              <p className="text-sm text-gray-600">已掌握</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4">
              <div className="text-3xl font-bold text-red-600">{totalWords - correctCount}</div>
              <p className="text-sm text-gray-600">需复习</p>
            </div>
          </div>
          <div className="flex gap-4 justify-center">
            <button onClick={restart} className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold">
              <RotateCcw className="w-5 h-5" />
              再练一次
            </button>
            <button onClick={backToCategories} className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-semibold">
              换个类型
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <button onClick={backToCategories} className="text-blue-600 hover:text-blue-700 mb-4 flex items-center gap-2">
        <ArrowLeft className="w-5 h-5" />
        返回选择
      </button>

      <div className="text-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{selectedCategory?.name}</h2>
        <p className="text-gray-600">
          进度 {currentWordIndex + 1} / {currentWords.length} · 已掌握 {correctCount} 个
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="text-center py-8">
          <div className="flex items-center justify-center gap-3 mb-6">
            <h3 className="text-4xl font-bold text-gray-800">{currentWord?.word}</h3>
            <button
              onClick={() => speak(currentWord?.word || '')}
              className="p-3 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Volume2 className="w-6 h-6 text-blue-600" />
            </button>
          </div>

          {showDefinition ? (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-center gap-4 text-gray-600">
                <span className="text-lg font-medium">{currentWord?.phonetic}</span>
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {currentWord?.partOfSpeech}
                </span>
              </div>
              <p className="text-xl text-gray-800 font-medium">{currentWord?.definition}</p>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-600 italic">"{currentWord?.example}"</p>
                <button
                  onClick={() => speak(currentWord?.example || '')}
                  className="mt-2 text-sm text-blue-600 hover:text-blue-700 flex items-center justify-center gap-1"
                >
                  <Volume2 className="w-4 h-4" />
                  听例句
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowDefinition(true)}
              className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold text-lg transition-colors"
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

      <div className="mt-6 bg-white rounded-xl shadow-md p-4">
        <p className="text-sm text-gray-500 mb-3">当前分类掌握情况:</p>
        <div className="flex flex-wrap gap-2">
          {currentWords.slice(0, 10).map((word) => (
            <span
              key={word.word}
              className={`px-3 py-1 rounded-full text-sm border ${getMasteryColor(word.word)}`}
              title={getMasteryText(mastery[selectedCategory?.id || '']?.[word.word] || 0)}
            >
              {word.word}
            </span>
          ))}
          {currentWords.length > 10 && (
            <span className="px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-500">
              +{currentWords.length - 10}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default VocabularyPage;
