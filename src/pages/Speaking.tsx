import { useState } from 'react';
import { Mic, Play, Volume2, Check } from 'lucide-react';

const SpeakingPage = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recorded, setRecorded] = useState(false);

  const sentences = [
    'Practice makes perfect.',
    'English is fun to learn.',
    'Every day is a new beginning.',
    'Dream big and work hard.'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSentence = sentences[currentIndex];

  const playOriginal = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentSentence);
      utterance.lang = 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setRecorded(true);
      }, 3000);
    }
  };

  const next = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setRecorded(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">口语跟读</h1>
        <p className="text-gray-600">
          第 {currentIndex + 1} 句 / 共 {sentences.length} 句
        </p>
      </div>

      <div className="card">
        <div className="text-center py-8">
          <h2 className="text-2xl font-display font-bold text-gray-800 mb-6">{currentSentence}</h2>
          
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={playOriginal}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-colors"
            >
              <Volume2 className="w-5 h-5" />
              听原文
            </button>
            <button
              onClick={toggleRecording}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors ${
                isRecording
                  ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                  : 'bg-purple-500 hover:bg-purple-600 text-white'
              }`}
            >
              <Mic className="w-5 h-5" />
              {isRecording ? '录音中...' : '开始录音'}
            </button>
          </div>

          {recorded && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-center gap-2 p-4 bg-green-50 rounded-xl">
                <Check className="w-5 h-5 text-green-600" />
                <span className="text-green-700 font-medium">录音成功！</span>
              </div>
              <div className="flex items-center justify-center gap-4">
                <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                  <Play className="w-4 h-4" />
                  播放录音
                </button>
              </div>
              <button onClick={next} className="btn-primary">
                {currentIndex < sentences.length - 1 ? '下一句' : '完成练习'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpeakingPage;
