import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Home, BookOpen, Headphones, Mic, Type, FileText, PenTool, Trophy, Users, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAppStore } from './store';
import HomePage from './pages/Home';
import CoursesPage from './pages/Courses';
import VocabularyPage from './pages/Vocabulary';
import GrammarPage from './pages/Grammar';
import SpeakingPage from './pages/Speaking';
import ListeningPage from './pages/Listening';
import ReadingPage from './pages/Reading';
import WritingPage from './pages/Writing';
import ProgressPage from './pages/Progress';
import CommunityPage from './pages/Community';
import ProfilePage from './pages/Profile';
import LoginPage from './pages/Login';
import RegisterPage from './pages/Register';

function App() {
  const { user, isLoggedIn, logout } = useAppStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { path: '/', label: '首页', icon: Home },
    { path: '/courses', label: '课程', icon: BookOpen },
    { path: '/learn/vocabulary', label: '单词记忆', icon: Type },
    { path: '/learn/grammar', label: '语法练习', icon: PenTool },
    { path: '/learn/speaking', label: '口语跟读', icon: Mic },
    { path: '/learn/listening', label: '听力训练', icon: Headphones },
    { path: '/learn/reading', label: '短文跟读', icon: FileText },
    { path: '/learn/writing', label: '写作练习', icon: PenTool },
    { path: '/progress', label: '学习进度', icon: Trophy },
    { path: '/community', label: '社区', icon: Users },
  ];

  if (!isLoggedIn) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="flex min-h-screen bg-gray-50">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow-lg"
        >
          {sidebarOpen ? <X /> : <Menu />}
        </button>

        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="p-6">
            <h1 className="text-2xl font-display font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              EnglishLab
            </h1>
            <p className="text-gray-500 text-sm mt-1">剑桥英语学习平台</p>
          </div>

          <nav className="px-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-primary/10 hover:to-secondary/10 hover:text-primary transition-all duration-200 mb-1"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
            <Link
              to="/profile"
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition-all duration-200"
            >
              <User className="w-5 h-5" />
              <span className="font-medium">{user?.username}</span>
            </Link>
            <button
              onClick={logout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 w-full"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">退出登录</span>
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 lg:ml-0 min-h-screen">
          <div className="p-4 lg:p-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/learn/vocabulary" element={<VocabularyPage />} />
              <Route path="/learn/grammar" element={<GrammarPage />} />
              <Route path="/learn/speaking" element={<SpeakingPage />} />
              <Route path="/learn/listening" element={<ListeningPage />} />
              <Route path="/learn/reading" element={<ReadingPage />} />
              <Route path="/learn/writing" element={<WritingPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/community" element={<CommunityPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
