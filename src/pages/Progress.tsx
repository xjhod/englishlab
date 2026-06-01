import { Trophy, Calendar, BookOpen, TrendingUp } from 'lucide-react';

const ProgressPage = () => {
  const achievements = [
    { name: 'First Lesson', description: 'Completed your first lesson', icon: '🎓', unlocked: true },
    { name: '7 Day Streak', description: 'Studied for 7 days in a row', icon: '🔥', unlocked: true },
    { name: 'Word Master', description: 'Learned 100 words', icon: '📚', unlocked: false },
    { name: 'Perfect Score', description: 'Got 100% on a quiz', icon: '⭐', unlocked: true },
    { name: 'Night Owl', description: 'Studied after 10 PM', icon: '🦉', unlocked: false },
    { name: 'Early Bird', description: 'Studied before 7 AM', icon: '🐦', unlocked: true }
  ];

  const weeklyStats = [
    { day: 'Mon', minutes: 45 },
    { day: 'Tue', minutes: 60 },
    { day: 'Wed', minutes: 30 },
    { day: 'Thu', minutes: 75 },
    { day: 'Fri', minutes: 40 },
    { day: 'Sat', minutes: 90 },
    { day: 'Sun', minutes: 50 }
  ];

  const totalMinutes = weeklyStats.reduce((sum, day) => sum + day.minutes, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">学习进度</h1>
        <p className="text-gray-600">查看你的学习统计和成就</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">连续学习</p>
              <p className="text-3xl font-bold text-gray-800">7 天</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">本周学习</p>
              <p className="text-3xl font-bold text-gray-800">{totalMinutes} 分钟</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-gray-500 text-sm">已学课程</p>
              <p className="text-3xl font-bold text-gray-800">15 节</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">本周学习时间</h2>
        <div className="flex items-end gap-4 h-48">
          {weeklyStats.map((stat, index) => {
            const height = (stat.minutes / 100) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-gray-100 rounded-t-xl relative" style={{ height: '160px' }}>
                  <div
                    className="absolute bottom-0 w-full bg-gradient-to-t from-primary to-secondary rounded-t-xl transition-all duration-500"
                    style={{ height: `${height}%` }}
                  />
                </div>
                <p className="text-gray-500 text-sm mt-2">{stat.day}</p>
                <p className="text-gray-800 font-medium text-sm">{stat.minutes}min</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
          <Trophy className="w-6 h-6 text-yellow-500" />
          成就徽章
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border-2 transition-all ${
                achievement.unlocked
                  ? 'border-yellow-300 bg-yellow-50'
                  : 'border-gray-200 bg-gray-50 opacity-50'
              }`}
            >
              <div className="text-4xl mb-2">{achievement.icon}</div>
              <h3 className="font-semibold text-gray-800">{achievement.name}</h3>
              <p className="text-sm text-gray-500">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressPage;
