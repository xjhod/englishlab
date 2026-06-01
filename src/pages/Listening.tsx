import { useState } from 'react';
import { Play, Volume2, Check, X, RotateCcw } from 'lucide-react';

const ListeningPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [showCheck, setShowCheck] = useState(false);
  const [score, setScore] = useState(0);

  const exercises = [
    {
      text: 'The weather is beautiful today.',
      hint: '天气'
    },
    {
      text: 'I love learning English.',
      hint: '学习'
    },
    {
      text: 'Practice makes perfect.',
      hint: '练习'
    }
  ];

  const current = exercises[currentIndex];

  const playAudio = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(current.text);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const checkAnswer = () => {
    setShowCheck(true);
    if (answer.toLowerCase().trim() === current.text.toLowerCase()) {
      setScore(prev => prev + 1);
    }
  };

  const next = () => {
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setAnswer('');
      setShowCheck(false);
    }
  };

  const restart = () => {
    setCurrentIndex(0);
    setAnswer('');
    setShowCheck(false);
    setScore(0);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">听力训练</h1>
        <p className="text-gray-600">
          第 {currentIndex + 1} 题 / 共 {exercises.length} 题 · 得分 {score}
        </p>
      </div>

      {currentIndex < exercises.length ? (
        <div className="card">
          <div className="text-center py-8">
            <div className="flex items-center justify-center gap-4 mb-8">
              <button
                onClick={playAudio}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl font-semibold transition-all hover:scale-105"
              >
                <Play className="w-6 h-6" />
                播放音频
              </button>
            </div>

            <p className="text-gray-500 mb-4">提示：{current.hint}</p>

            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              disabled={showCheck}
              placeholder="请输入你听到的内容..."
              className="w-full px-6 py-4 text-lg text-center border-2 border-gray-200 rounded-xl focus:border-primary focus:outline-none transition-colors disabled:opacity-50"
            />

            {!showCheck ? (
              <button onClick={checkAnswer} className="btn-primary mt-6">
                检查答案
              </button>
            ) : (
                <div className="mt-6">
                  <div className={`p-4 rounded-xl mb-4 ${answer.toLowerCase().trim() === current.text.toLowerCase() ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {answer.toLowerCase().trim() === current.text.toLowerCase() ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <X className="w-6 h-6" />
                      )}
                      <span className="font-semibold">
                        {answer.toLowerCase().trim() === current.text.toLowerCase() ? '回答正确！' : '回答错误'}
                      </span>
                    </div>
                    <p>正确答案：{current.text}</p>
                  </div>
                  <button onClick={next} className="btn-primary">
                    {currentIndex < exercises.length - 1 ? '下一题' : '完成练习'}
                  </button>
                </div>
            )}
          </div>
        </div>
      ) : (
        <div className="card text-center py-8">
          <h2 className="text-2xl font-display font-bold text-gray-800 mb-4">练习完成！</h2>
          <p className="text-4xl font-bold text-primary mb-2">{score} / {exercises.length}</p>
          <p className="text-gray-600 mb-6">
            {score === exercises.length ? '完美！全部正确！' : score >= 2 ? '做得不错！' : '继续加油！'}
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

export default ListeningPage;
