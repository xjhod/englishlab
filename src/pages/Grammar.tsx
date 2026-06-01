import { useState } from 'react';
import { Check, X, RotateCcw } from 'lucide-react';
import { grammarTopics, GrammarTopic } from '../data/grammarQuestions';

const GrammarPage = () => {
  const [selectedTopic, setSelectedTopic] = useState<GrammarTopic | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = selectedTopic?.questions[currentIndex];

  const startTopic = (topic: GrammarTopic) => {
    setSelectedTopic(topic);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
  };

  const handleSelect = (option: string) => {
    if (selectedAnswer || !currentQuestion) return;
    setSelectedAnswer(option);
    setShowResult(true);
    if (option === currentQuestion.correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (!selectedTopic) return;
    if (currentIndex < selectedTopic.questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
  };

  const backToTopics = () => {
    setSelectedTopic(null);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
  };

  if (!selectedTopic) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">语法练习</h1>
          <p className="text-gray-600">选择一个语法点开始练习</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {grammarTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => startTopic(topic)}
              className="card text-left hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{topic.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{topic.description}</p>
              <div className="text-primary font-medium text-sm">
                {topic.questions.length} 道题目
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  if (currentIndex >= selectedTopic.questions.length) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="card text-center py-8">
          <h2 className="text-2xl font-display font-bold text-gray-800 mb-4">练习完成！</h2>
          <p className="text-4xl font-bold text-primary mb-2">
            {score} / {selectedTopic.questions.length}
          </p>
          <p className="text-gray-600 mb-6">
            {score === selectedTopic.questions.length
              ? '完美！全部正确！'
              : score >= selectedTopic.questions.length * 0.7
              ? '做得不错！'
              : '继续加油！'}
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick={restart} className="btn-primary flex items-center gap-2">
              <RotateCcw className="w-5 h-5" />
              再练一次
            </button>
            <button onClick={backToTopics} className="btn-secondary">
              返回选择
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <button
          onClick={backToTopics}
          className="text-primary hover:text-primary/80 mb-4 text-sm"
        >
          ← 返回选择
        </button>
        <h1 className="text-2xl font-display font-bold text-gray-800 mb-2">{selectedTopic.name}</h1>
        <p className="text-gray-600">
          第 {currentIndex + 1} 题 / 共 {selectedTopic.questions.length} 题 · 得分 {score}
        </p>
      </div>

      <div className="card">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">{currentQuestion.question}</h2>
          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                disabled={selectedAnswer !== null}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selectedAnswer
                    ? option === currentQuestion.correct
                      ? 'border-green-500 bg-green-50'
                      : option === selectedAnswer
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 opacity-50'
                    : 'border-gray-200 hover:border-primary hover:bg-primary/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option}</span>
                  {selectedAnswer && option === currentQuestion.correct && (
                    <Check className="w-5 h-5 text-green-500" />
                  )}
                  {selectedAnswer && option === selectedAnswer && option !== currentQuestion.correct && (
                    <X className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {showResult && (
          <div className="pt-4 border-t">
            <div className={`p-4 rounded-xl mb-4 ${selectedAnswer === currentQuestion.correct ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              <p className="font-semibold mb-1">
                {selectedAnswer === currentQuestion.correct ? '回答正确！' : '回答错误'}
              </p>
              <p className="text-sm">{currentQuestion.explanation}</p>
            </div>
            <button onClick={handleNext} className="btn-primary w-full">
              {currentIndex < selectedTopic.questions.length - 1 ? '下一题' : '查看结果'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GrammarPage;
