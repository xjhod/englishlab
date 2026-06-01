import { useNavigate } from 'react-router-dom';
import { BookOpen, Headphones, Mic, Type, FileText, PenTool, Trophy, TrendingUp } from 'lucide-react';
import { useAppStore } from '../store';

const HomePage = () => {
  const { user } = useAppStore();
  const navigate = useNavigate();

  const learningModules = [
    { path: '/learn/vocabulary', label: '单词记忆', icon: Type, color: 'from-blue-500 to-blue-600' },
    { path: '/learn/grammar', label: '语法练习', icon: PenTool, color: 'from-green-500 to-green-600' },
    { path: '/learn/speaking', label: '口语跟读', icon: Mic, color: 'from-purple-500 to-purple-600' },
    { path: '/learn/listening', label: '听力训练', icon: Headphones, color: 'from-orange-500 to-orange-600' },
    { path: '/learn/reading', label: '短文跟读', icon: FileText, color: 'from-pink-500 to-pink-600' },
    { path: '/learn/writing', label: '写作练习', icon: PenTool, color: 'from-teal-500 to-teal-600' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="card bg-gradient-to-r from-primary to-secondary text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold mb-2">
              欢迎回来，{user?.username}！
            </h1>
            <p className="text-white/80">继续你的英语学习之旅吧</p>
          </div>
          <Trophy className="w-16 h-16 text-white/30" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">今日学习</p>
              <p className="text-2xl font-bold text-gray-800">45 分钟</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <Trophy className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">连续打卡</p>
              <p className="text-2xl font-bold text-gray-800">7 天</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 rounded-xl">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">已学单词</p>
              <p className="text-2xl font-bold text-gray-800">256 个</p>
            </div>
          </div>
        </div>
      </div>

      {/* Learning modules */}
      <div>
        <h2 className="text-2xl font-display font-bold text-gray-800 mb-6">开始学习</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {learningModules.map((module) => {
            const Icon = module.icon;
            return (
              <button
                key={module.path}
                onClick={() => navigate(module.path)}
                className="card text-left hover:scale-105 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${module.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">{module.label}</h3>
                <p className="text-gray-500 text-sm">点击开始练习</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Recommended courses */}
      <div>
        <h2 className="text-2xl font-display font-bold text-gray-800 mb-6">推荐课程</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <button onClick={() => navigate('/courses')} className="card text-left hover:scale-105 transition-all">
            <div className="flex items-start gap-4">
              <div className="p-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl">
                <span className="text-white font-bold">KET</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">KET 入门课程</h3>
                <p className="text-gray-500 text-sm">适合英语初学者</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-secondary w-2/3" />
                  </div>
                  <span className="text-sm text-gray-500">66%</span>
                </div>
              </div>
            </div>
          </button>

          <button onClick={() => navigate('/courses')} className="card text-left hover:scale-105 transition-all">
            <div className="flex items-start gap-4">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl">
                <span className="text-white font-bold">PET</span>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">PET 中级课程</h3>
                <p className="text-gray-500 text-sm">适合有一定基础的学习者</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-primary to-secondary w-1/4" />
                  </div>
                  <span className="text-sm text-gray-500">25%</span>
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
