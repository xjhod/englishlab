import { useState } from 'react';
import { Volume2, Mic, Check, ArrowRight, ArrowLeft } from 'lucide-react';

const ReadingPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedSentences, setRecordedSentences] = useState<number[]>([]);

  const passages = [
    {
      title: 'A Beautiful Day',
      sentences: [
        'The sun is shining brightly.',
        'Birds are singing in the trees.',
        'Children are playing in the park.',
        'Everyone is happy today.'
      ]
    },
    {
      title: 'Learning English',
      sentences: [
        'English is an international language.',
        'Practice every day to improve.',
        'Mistakes help us learn better.',
        'Keep going and never give up.'
      ]
    }
  ];

  const currentPassage = passages[0];
  const currentSentence = currentPassage.sentences[currentIndex];

  const playSentence = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentSentence);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const toggleRecording = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTimeout(() => {
        setIsRecording(false);
        setRecordedSentences(prev => [...prev, currentIndex]);
      }, 3000);
    }
  };

  const nextSentence = () => {
    if (currentIndex < currentPassage.sentences.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const prevSentence = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">短文跟读</h1>
        <p className="text-gray-600">{currentPassage.title}</p>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1 text-center">
            <span className="text-gray-500">
              句子 {currentIndex + 1} / {currentPassage.sentences.length}
            </span>
          </div>
        </div>

        <div className="text-center py-8">
          <div className="text-2xl font-display text-gray-800 mb-8 leading-relaxed">
            {currentSentence}
          </div>

          <div className="flex items-center justify-center gap-4 mb-6">
            <button
              onClick={playSentence}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors"
            >
              <Volume2 className="w-5 h-5" />
              听朗读
            </button>
            <button
              onClick={toggleRecording}
              disabled={recordedSentences.includes(currentIndex)}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                  : recordedSentences.includes(currentIndex)
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-purple-500 hover:bg-purple-600 text-white'
              }`}
            >
              <Mic className="w-5 h-5" />
              {isRecording ? '录音中...' : recordedSentences.includes(currentIndex) ? '已完成' : '我来跟读'}
            </button>
          </div>

          {recordedSentences.includes(currentIndex) && (
            <div className="flex items-center justify-center gap-2 p-4 bg-green-50 rounded-xl mb-6">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-green-700 font-medium">跟读完成！</span>
            </div>
          )}

          <div className="flex items-center justify-center gap-4">
            <button
              onClick={prevSentence}
              disabled={currentIndex === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                currentIndex === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              上一句
            </button>
            <button
              onClick={nextSentence}
              disabled={currentIndex === currentPassage.sentences.length - 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                currentIndex === currentPassage.sentences.length - 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              下一句
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="pt-4 border-t">
          <p className="text-sm text-gray-500 text-center mb-4">全文</p>
          <div className="bg-gray-50 rounded-xl p-4">
            {currentPassage.sentences.map((sentence, index) => (
              <p
                key={index}
                className={`mb-2 transition-all ${
                  index === currentIndex
                    ? 'text-primary font-semibold'
                    : recordedSentences.includes(index)
                    ? 'text-green-600'
                    : 'text-gray-500'
                }`}
              >
                {sentence}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingPage;
