const CoursesPage = () => {
  const courses = [
    {
      id: 'ket',
      name: 'KET 入门课程',
      level: 'KET',
      description: '适合英语初学者，掌握基础词汇和语法',
      color: 'from-red-500 to-orange-500',
      progress: 66,
      lessons: 40,
      completed: 26
    },
    {
      id: 'pet',
      name: 'PET 中级课程',
      level: 'PET',
      description: '适合有一定基础的学习者',
      color: 'from-blue-500 to-cyan-500',
      progress: 25,
      lessons: 50,
      completed: 12
    },
    {
      id: 'fce',
      name: 'FCE 高级课程',
      level: 'FCE',
      description: '中高级英语水平，为留学和工作准备',
      color: 'from-green-500 to-emerald-500',
      progress: 0,
      lessons: 60,
      completed: 0
    },
    {
      id: 'cae',
      name: 'CAE 流利课程',
      level: 'CAE',
      description: '高级流利英语，接近母语水平',
      color: 'from-purple-500 to-violet-500',
      progress: 0,
      lessons: 70,
      completed: 0
    },
    {
      id: 'cpe',
      name: 'CPE 精通课程',
      level: 'CPE',
      description: '最高级水平，精通英语',
      color: 'from-pink-500 to-rose-500',
      progress: 0,
      lessons: 80,
      completed: 0
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-display font-bold text-gray-800 mb-2">剑桥英语课程</h1>
        <p className="text-gray-600">选择适合你水平的课程开始学习</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="card hover:scale-105 transition-all cursor-pointer">
            <div className={`h-24 rounded-xl bg-gradient-to-r ${course.color} flex items-center justify-center mb-4`}>
              <span className="text-white text-3xl font-display font-bold">{course.level}</span>
            </div>
            
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{course.name}</h3>
            <p className="text-gray-500 text-sm mb-4">{course.description}</p>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">学习进度</span>
                <span className="font-semibold text-primary">{course.progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-500"
                  style={{ width: `${course.progress}%` }}
                />
              </div>
              <p className="text-sm text-gray-500">
                已完成 {course.completed} / {course.lessons} 节课
              </p>
            </div>

            <button className="btn-primary w-full mt-4">
              {course.progress > 0 ? '继续学习' : '开始学习'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesPage;
