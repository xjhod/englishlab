import { useState } from 'react';
import { Play, Volume2, Check, X, RotateCcw } from 'lucide-react';
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
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-2">听力训练</h1>
        <p className="text-gray-600 text-center mb-8">选择一种题型开始练习</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {listeningTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => startTopic(topic)}
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg border-2 border-gray-100 hover:border-blue-500 transition-all text-left"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{topic.name}</h3>
              <p className="text-gray-600 text-sm mb-3">{topic.description}</p>
              <span className="text-blue-600 font-medium">{topic.questions.length} 道题目</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const isPart2 = selectedTopic.id === 'part2';

  return (
    <div className="max-w-2xl mx-auto py-8">
      <button onClick={backToTopics} className="text-blue-600 hover:text-blue-700 mb-4">← 返回选择</button>
      <h2 className="text-2xl font-bold mb-2">{selectedTopic.name}</h2>
      <p className="text-gray-600 mb-6">第 {currentIndex + 1} 题 / 共 {selectedTopic.questions.length} 题 · 得分 {score}</p>

      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => playAudio()}
            className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all"
          >
            <Play className="w-5 h-5" />
            播放一遍
          </button>
          <button
            onClick={() => { playAudio(); setTimeout(() => playAudio(), 2000); }}
            className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-semibold transition-all"
          >
            <Volume2 className="w-5 h-5" />
            播放两遍
          </button>
        </div>

        {isPart2 ? (
          <div className="space-y-4">
            <p className="text-gray-500 text-center">请填写你听到的单词：</p>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              disabled={showResult}
              placeholder="输入单词..."
              className="w-full px-6 py-4 text-lg text-center border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none"
            />
            {!showResult && (
              <button onClick={handleCheckFillIn} className="w-full py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-semibold">
                检查答案
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {currentQuestion?.options?.map((option, index) => (
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
                    : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
                }`}
              >
                <span className="font-medium">{option}</span>
                {selectedAnswer && option === currentQuestion.correct && <Check className="w-5 h-5 text-green-500 float-right" />}
                {selectedAnswer && option === selectedAnswer && option !== currentQuestion.correct && <X className="w-5 h-5 text-red-500 float-right" />}
              </button>
            ))}
          </div>
        )}

        {showResult && (
          <div className="mt-6 pt-4 border-t">
            <div className={`p-4 rounded-xl mb-4 ${selectedAnswer === currentQuestion?.correct ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
              <div className="flex items-center justify-center gap-2 mb-2">
                {selectedAnswer === currentQuestion?.correct ? (
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
              <p className="text-center">正确答案：<span className="font-semibold">{currentQuestion?.correct}</span></p>
              <p className="text-sm mt-3 p-3 bg-white/50 rounded-lg">📖 解析：{currentQuestion?.explanation}</p>
            </div>
            <button onClick={handleNext} className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold">
              {currentIndex < selectedTopic.questions.length - 1 ? '下一题' : '查看结果'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListeningPage;
