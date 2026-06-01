import { useState } from 'react';
import { User, Mail, GraduationCap, Settings, Bell, Lock, LogOut } from 'lucide-react';
import { useAppStore } from '../store';

const ProfilePage = () => {
  const { user, setUser } = useAppStore();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [level, setLevel] = useState(user?.level || 'intermediate');

  const handleSave = () => {
    if (user) {
      setUser({ ...user, username, email, level: level as any });
    }
  };

  const levels = [
    { value: 'beginner', label: 'Beginner (入门)', color: 'from-green-500 to-emerald-500' },
    { value: 'intermediate', label: 'Intermediate (中级)', color: 'from-blue-500 to-cyan-500' },
    { value: 'advanced', label: 'Advanced (高级)', color: 'from-purple-500 to-pink-500' }
  ];

  const currentLevel = levels.find(l => l.value === level) || levels[1];

  const navigation = [
    { icon: Bell, label: '通知设置' },
    { icon: Lock, label: '隐私设置' },
    { icon: Settings, label: '应用设置' }
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">个人中心</h1>
        <p className="text-gray-600">管理你的账户和学习设置</p>
      </div>

      <div className="card">
        <div className="flex items-center gap-6 mb-6">
          <div className={`w-24 h-24 bg-gradient-to-r ${currentLevel.color} rounded-full flex items-center justify-center text-white text-4xl font-display font-bold`}>
            {username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{username}</h2>
            <p className="text-gray-500">{email}</p>
            <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${currentLevel.color}`}>
              {currentLevel.label}
            </span>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <User className="w-5 h-5" />
          个人信息
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">用户名</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">英语水平</label>
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-gray-400" />
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
              >
                {levels.map(l => (
                  <option key={l.value} value={l.value}>{l.label}</option>
                ))}
              </select>
            </div>
          </div>
          <button onClick={handleSave} className="btn-primary w-full">
            保存更改
          </button>
        </div>
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">设置</h3>
        <div className="space-y-2">
          {navigation.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors text-left"
              >
                <Icon className="w-5 h-5 text-gray-500" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="card border-red-100">
        <button className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors text-left">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">退出登录</span>
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
