import { useState } from 'react';
import { Play, Volume2, Check, X, RotateCcw, VolumeX } from 'lucide-react';
import { listeningTopics, ListeningTopic } from '../data/listeningQuestions';

const ListeningPage = () => {
  const [selectedTopic, setSelectedTopic] = useState<ListeningTopic | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [userInput, setUserInput] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = selectedTopic?.questions[currentIndex];

  const playAudio = (text?: string) => {
    const textToPlay = text || currentQuestion?.audio || '';
    if ('speechSynthesis' in window && textToPlay) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToPlay);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  const playAudioTwice = () => {
    playAudio();
    setTimeout(() => playAudio(), 2000);
  };

  const startTopic = (topic: ListeningTopic) => {
    setSelectedTopic(topic);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setUserInput('');
    setScore(0);
    setShowResult(false);
    setTimeout(() => playAudio(topic.questions[0].audio), 500);
  };

  const handleSelectAnswer = (answer: string) => {
    if (selectedAnswer || !currentQuestion) return;
    setSelectedAnswer(answer);
    setShowResult(true);
    if (answer === currentQuestion.correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleCheckFillIn = () => {
    if (!currentQuestion || !userInput.trim()) return;
    setShowResult(true);
    if (userInput.toLowerCase().trim() === currentQuestion.correct.toLowerCase()) {
      setScore(prev => prev + 1);
      setSelectedAnswer(userInput);
    } else {
      setSelectedAnswer(userInput);
    }
  };

  const handleNext = () => {
    if (!selectedTopic) return;
    if (currentIndex < selectedTopic.questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setUserInput('');
      setShowResult(false);
      setTimeout(() => playAudio(selectedTopic.questions[currentIndex + 1].audio), 500);
    }
  };

  const restart = () => {
    if (!selectedTopic) return;
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setUserInput('');
    setScore(0);
    setShowResult(false);
    setTimeout(() => playAudio(selectedTopic.questions[0].audio), 500);
  };

  const backToTopics = () => {
    setSelectedTopic(null);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setUserInput('');
    setScore(0);
    setShowResult(false);
  };

  if (!selectedTopic) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">听力训练</h1>
          <p className="text-gray-600">选择一种题型开始练习</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {listeningTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => startTopic(topic)}
              className="card text-left hover:shadow-lg transition-all hover:border-primary"
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

  const isPart2 = selectedTopic.id === 'part2';

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
        <button onClick={backToTopics} className="text-primary hover:text-primary/80 mb-4 text-sm">
          ← 返回选择
        </button>
        <h1 className="text-2xl font-display font-bold text-gray-800 mb-2">{selectedTopic.name}</h1>
        <p className="text-gray-600">
          第 {currentIndex + 1} 题 / 共 {selectedTopic.questions.length} 题 · 得分 {score}
        </p>
      </div>

      <div className="card">
        <div className="text-center py-6">
          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={() => playAudio()}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-semibold transition-all hover:scale-105"
            >
              <Play className="w-5 h-5" />
              播放一遍
            </button>
            <button
              onClick={playAudioTwice}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-xl font-semibold transition-all hover:scale-105"
            >
              <Volume2 className="w-5 h-5" />
              播放两遍
            </button>
          </div>

          {isPart2 ? (
            <div className="space-y-4">
              <p className="text-gray-500 text-sm">请填写你听到的单词：</p>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                disabled={showResult}
                placeholder="输入单词..."
                className="w-full px-6 py-4 text-lg text-center border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors disabled:opacity-50"
              />
            </div>
          ) : (
            <div className="space-y-3">
              {currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(option)}
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
          )}

          {showResult && (
            <div className="mt-6 pt-4 border-t">
              <div className={`p-4 rounded-xl mb-4 ${selectedAnswer === currentQuestion.correct ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  {selectedAnswer === currentQuestion.correct ? (
                    <>
                      <Check className="w-6 h-6" />
                      <span className="font-semibold">回答正确！</span>
                    </>
                  ) : (
                    <>
                      <X className="w-6 h-6" />
                      <span className="font-semibold">回答错误</span>
                    </>
                  )}
                </div>
                <p className="text-sm mb-2">
                  正确答案：<span className="font-semibold">{currentQuestion.correct}</span>
                </p>
                <p className="text-sm mt-3 p-3 bg-white/50 rounded-lg">
                  📖 解析：{currentQuestion.explanation}
                </p>
              </div>

              {isPart2 ? (
                <button onClick={handleNext} className="btn-primary w-full">
                  {currentIndex < selectedTopic.questions.length - 1 ? '下一题' : '查看结果'}
                </button>
              ) : (
                <button onClick={handleNext} className="btn-primary w-full">
                  {currentIndex < selectedTopic.questions.length - 1 ? '下一题' : '查看结果'}
                </button>
              )}
            </div>
          )}

          {!showResult && isPart2 && (
            <button onClick={handleCheckFillIn} className="btn-primary mt-4 w-full">
              检查答案
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListeningPage;
