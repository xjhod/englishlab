export interface Word {
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  example: string;
}

export interface WordCategory {
  id: string;
  name: string;
  description: string;
  words: Word[];
}

export const wordCategories: WordCategory[] = [
  {
    id: 'daily',
    name: '日常生活',
    description: '日常交流中常用的基础词汇',
    words: [
      { word: 'morning', phonetic: '/ˈmɔːrnɪŋ/', partOfSpeech: 'n.', definition: '早晨，上午', example: 'I wake up early in the morning.' },
      { word: 'evening', phonetic: '/ˈiːvnɪŋ/', partOfSpeech: 'n.', definition: '傍晚，晚上', example: 'We usually have dinner in the evening.' },
      { word: 'breakfast', phonetic: '/ˈbrekfəst/', partOfSpeech: 'n.', definition: '早餐', example: 'I eat breakfast at seven o\'clock.' },
      { word: 'lunch', phonetic: '/lʌntʃ/', partOfSpeech: 'n.', definition: '午餐', example: 'We had lunch at the restaurant.' },
      { word: 'dinner', phonetic: '/ˈdɪnər/', partOfSpeech: 'n.', definition: '晚餐', example: 'My mother cooks dinner every day.' },
      { word: 'home', phonetic: '/hoʊm/', partOfSpeech: 'n.', definition: '家，住所', example: 'I go home at five o\'clock.' },
      { word: 'school', phonetic: '/skuːl/', partOfSpeech: 'n.', definition: '学校', example: 'I study at this school.' },
      { word: 'work', phonetic: '/wɜːrk/', partOfSpeech: 'n.', definition: '工作，职业', example: 'My father goes to work by car.' },
      { word: 'friend', phonetic: '/frend/', partOfSpeech: 'n.', definition: '朋友', example: 'She is my best friend.' },
      { word: 'family', phonetic: '/ˈfæməli/', partOfSpeech: 'n.', definition: '家庭，家人', example: 'I love my family.' },
      { word: 'food', phonetic: '/fuːd/', partOfSpeech: 'n.', definition: '食物', example: 'We need to buy some food.' },
      { word: 'water', phonetic: '/ˈwɔːtər/', partOfSpeech: 'n.', definition: '水', example: 'Drink more water every day.' },
      { word: 'book', phonetic: '/bʊk/', partOfSpeech: 'n.', definition: '书，书籍', example: 'I am reading a book.' },
      { word: 'phone', phonetic: '/foʊn/', partOfSpeech: 'n.', definition: '电话，手机', example: 'I have a new phone.' },
      { word: 'time', phonetic: '/taɪm/', partOfSpeech: 'n.', definition: '时间', example: 'What time is it?' },
      { word: 'day', phonetic: '/deɪ/', partOfSpeech: 'n.', definition: '天，日', example: 'Today is a sunny day.' },
      { word: 'night', phonetic: '/naɪt/', partOfSpeech: 'n.', definition: '夜晚', example: 'I sleep at night.' },
      { word: 'week', phonetic: '/wiːk/', partOfSpeech: 'n.', definition: '星期，周', example: 'There are seven days in a week.' },
      { word: 'month', phonetic: '/mʌnθ/', partOfSpeech: 'n.', definition: '月，月份', example: 'My birthday is in July.' },
      { word: 'year', phonetic: '/jɪr/', partOfSpeech: 'n.', definition: '年，年份', example: 'Happy New Year!' },
    ]
  },
  {
    id: 'food',
    name: '食物与饮食',
    description: '各种食物、饮品相关词汇',
    words: [
      { word: 'apple', phonetic: '/ˈæpl/', partOfSpeech: 'n.', definition: '苹果', example: 'An apple a day keeps the doctor away.' },
      { word: 'banana', phonetic: '/bəˈnænə/', partOfSpeech: 'n.', definition: '香蕉', example: 'I like bananas for breakfast.' },
      { word: 'orange', phonetic: '/ˈɔːrɪndʒ/', partOfSpeech: 'n.', definition: '橙子', example: 'Orange juice is very refreshing.' },
      { word: 'grape', phonetic: '/ɡreɪp/', partOfSpeech: 'n.', definition: '葡萄', example: 'These grapes are very sweet.' },
      { word: 'pear', phonetic: '/per/', partOfSpeech: 'n.', definition: '梨', example: 'The pear is very juicy.' },
      { word: 'watermelon', phonetic: '/ˈwɔːtərmelən/', partOfSpeech: 'n.', definition: '西瓜', example: 'Watermelon is perfect for summer.' },
      { word: 'strawberry', phonetic: '/ˈstrɔːberi/', partOfSpeech: 'n.', definition: '草莓', example: 'Strawberries are red and sweet.' },
      { word: 'pineapple', phonetic: '/ˈpaɪnæpl/', partOfSpeech: 'n.', definition: '菠萝', example: 'I like pineapple on pizza.' },
      { word: 'cake', phonetic: '/keɪk/', partOfSpeech: 'n.', definition: '蛋糕', example: 'We had cake for her birthday.' },
      { word: 'bread', phonetic: '/bred/', partOfSpeech: 'n.', definition: '面包', example: 'I eat bread with butter.' },
      { word: 'rice', phonetic: '/raɪs/', partOfSpeech: 'n.', definition: '米饭', example: 'I eat rice every day.' },
      { word: 'noodle', phonetic: '/ˈnuːdl/', partOfSpeech: 'n.', definition: '面条', example: 'I like eating noodles.' },
      { word: 'meat', phonetic: '/miːt/', partOfSpeech: 'n.', definition: '肉', example: 'I eat meat for dinner.' },
      { word: 'fish', phonetic: '/fɪʃ/', partOfSpeech: 'n.', definition: '鱼', example: 'Fish is very healthy.' },
      { word: 'egg', phonetic: '/eɡ/', partOfSpeech: 'n.', definition: '鸡蛋', example: 'I have an egg for breakfast.' },
      { word: 'milk', phonetic: '/mɪlk/', partOfSpeech: 'n.', definition: '牛奶', example: 'I drink milk every morning.' },
      { word: 'coffee', phonetic: '/ˈkɔːfi/', partOfSpeech: 'n.', definition: '咖啡', example: 'I drink coffee in the morning.' },
      { word: 'tea', phonetic: '/tiː/', partOfSpeech: 'n.', definition: '茶', example: 'Would you like a cup of tea?' },
      { word: 'juice', phonetic: '/dʒuːs/', partOfSpeech: 'n.', definition: '果汁', example: 'Orange juice is my favorite.' },
      { word: 'soup', phonetic: '/suːp/', partOfSpeech: 'n.', definition: '汤', example: 'I like chicken soup.' },
    ]
  },
  {
    id: 'animals',
    name: '动物',
    description: '各种动物相关词汇',
    words: [
      { word: 'dog', phonetic: '/dɔːɡ/', partOfSpeech: 'n.', definition: '狗', example: 'I have a pet dog.' },
      { word: 'cat', phonetic: '/kæt/', partOfSpeech: 'n.', definition: '猫', example: 'The cat is sleeping on the sofa.' },
      { word: 'bird', phonetic: '/bɜːrd/', partOfSpeech: 'n.', definition: '鸟', example: 'Birds can fly.' },
      { word: 'fish', phonetic: '/fɪʃ/', partOfSpeech: 'n.', definition: '鱼', example: 'Fish swim in the water.' },
      { word: 'rabbit', phonetic: '/ˈræbɪt/', partOfSpeech: 'n.', definition: '兔子', example: 'Rabbits have long ears.' },
      { word: 'horse', phonetic: '/hɔːrs/', partOfSpeech: 'n.', definition: '马', example: 'I like riding horses.' },
      { word: 'cow', phonetic: '/kaʊ/', partOfSpeech: 'n.', definition: '牛', example: 'Cows give milk.' },
      { word: 'pig', phonetic: '/pɪɡ/', partOfSpeech: 'n.', definition: '猪', example: 'Pigs like to eat.' },
      { word: 'sheep', phonetic: '/ʃiːp/', partOfSpeech: 'n.', definition: '羊', example: 'Sheep have wool.' },
      { word: 'chicken', phonetic: '/ˈtʃɪkɪn/', partOfSpeech: 'n.', definition: '鸡', example: 'Chickens lay eggs.' },
      { word: 'elephant', phonetic: '/ˈelɪfənt/', partOfSpeech: 'n.', definition: '大象', example: 'Elephants are very big.' },
      { word: 'lion', phonetic: '/ˈlaɪən/', partOfSpeech: 'n.', definition: '狮子', example: 'Lions are the king of the jungle.' },
      { word: 'tiger', phonetic: '/ˈtaɪɡər/', partOfSpeech: 'n.', definition: '老虎', example: 'Tigers are orange with black stripes.' },
      { word: 'bear', phonetic: '/ber/', partOfSpeech: 'n.', definition: '熊', example: 'Bears like honey.' },
      { word: 'monkey', phonetic: '/ˈmʌŋki/', partOfSpeech: 'n.', definition: '猴子', example: 'Monkeys like bananas.' },
      { word: 'giraffe', phonetic: '/dʒəˈræf/', partOfSpeech: 'n.', definition: '长颈鹿', example: 'Giraffes have long necks.' },
      { word: 'zebra', phonetic: '/ˈzebrə/', partOfSpeech: 'n.', definition: '斑马', example: 'Zebras have black and white stripes.' },
      { word: 'penguin', phonetic: '/ˈpeŋɡwɪn/', partOfSpeech: 'n.', definition: '企鹅', example: 'Penguins live in cold places.' },
      { word: 'dolphin', phonetic: '/ˈdɑːlfɪn/', partOfSpeech: 'n.', definition: '海豚', example: 'Dolphins are very smart.' },
      { word: 'panda', phonetic: '/ˈpændə/', partOfSpeech: 'n.', definition: '熊猫', example: 'Pandas are from China.' },
    ]
  },
  {
    id: 'school',
    name: '学校与学习',
    description: '学校生活和学习相关词汇',
    words: [
      { word: 'student', phonetic: '/ˈstuːdnt/', partOfSpeech: 'n.', definition: '学生', example: 'I am a student.' },
      { word: 'teacher', phonetic: '/ˈtiːtʃər/', partOfSpeech: 'n.', definition: '老师', example: 'My teacher is very kind.' },
      { word: 'class', phonetic: '/klæs/', partOfSpeech: 'n.', definition: '班级，课', example: 'We have math class today.' },
      { word: 'lesson', phonetic: '/ˈlesn/', partOfSpeech: 'n.', definition: '课程，课', example: 'I have an English lesson.' },
      { word: 'book', phonetic: '/bʊk/', partOfSpeech: 'n.', definition: '书', example: 'I need a new book.' },
      { word: 'desk', phonetic: '/desk/', partOfSpeech: 'n.', definition: '书桌', example: 'My desk is clean.' },
      { word: 'chair', phonetic: '/tʃeər/', partOfSpeech: 'n.', definition: '椅子', example: 'Sit on the chair.' },
      { word: 'pen', phonetic: '/pen/', partOfSpeech: 'n.', definition: '钢笔', example: 'Can I borrow your pen?' },
      { word: 'pencil', phonetic: '/ˈpensl/', partOfSpeech: 'n.', definition: '铅笔', example: 'I write with a pencil.' },
      { word: 'notebook', phonetic: '/ˈnoʊtbʊk/', partOfSpeech: 'n.', definition: '笔记本', example: 'I take notes in my notebook.' },
      { word: 'homework', phonetic: '/ˈhoʊmwɜːrk/', partOfSpeech: 'n.', definition: '作业', example: 'I do my homework every day.' },
      { word: 'exam', phonetic: '/ɪɡˈzæm/', partOfSpeech: 'n.', definition: '考试', example: 'We have an exam next week.' },
      { word: 'test', phonetic: '/test/', partOfSpeech: 'n.', definition: '测验', example: 'I got a good score on the test.' },
      { word: 'grade', phonetic: '/ɡreɪd/', partOfSpeech: 'n.', definition: '年级，成绩', example: 'I am in Grade Five.' },
      { word: 'score', phonetic: '/skɔːr/', partOfSpeech: 'n.', definition: '分数', example: 'What is your score?' },
      { word: 'study', phonetic: '/ˈstʌdi/', partOfSpeech: 'v.', definition: '学习', example: 'I study English every day.' },
      { word: 'learn', phonetic: '/lɜːrn/', partOfSpeech: 'v.', definition: '学习，学会', example: 'I want to learn English.' },
      { word: 'read', phonetic: '/riːd/', partOfSpeech: 'v.', definition: '阅读', example: 'I read books in the library.' },
      { word: 'write', phonetic: '/raɪt/', partOfSpeech: 'v.', definition: '写', example: 'I write a letter to my friend.' },
      { word: 'speak', phonetic: '/spiːk/', partOfSpeech: 'v.', definition: '说，讲', example: 'I can speak English.' },
    ]
  },
  {
    id: 'nature',
    name: '自然与天气',
    description: '自然现象和天气相关词汇',
    words: [
      { word: 'sun', phonetic: '/sʌn/', partOfSpeech: 'n.', definition: '太阳', example: 'The sun is shining.' },
      { word: 'moon', phonetic: '/muːn/', partOfSpeech: 'n.', definition: '月亮', example: 'The moon is bright tonight.' },
      { word: 'star', phonetic: '/stɑːr/', partOfSpeech: 'n.', definition: '星星', example: 'Stars are beautiful at night.' },
      { word: 'sky', phonetic: '/skaɪ/', partOfSpeech: 'n.', definition: '天空', example: 'The sky is blue.' },
      { word: 'cloud', phonetic: '/klaʊd/', partOfSpeech: 'n.', definition: '云', example: 'There are many clouds today.' },
      { word: 'rain', phonetic: '/reɪn/', partOfSpeech: 'n.', definition: '雨', example: 'It is raining outside.' },
      { word: 'snow', phonetic: '/snoʊ/', partOfSpeech: 'n.', definition: '雪', example: 'It is snowing heavily.' },
      { word: 'wind', phonetic: '/wɪnd/', partOfSpeech: 'n.', definition: '风', example: 'The wind is blowing.' },
      { word: 'storm', phonetic: '/stɔːrm/', partOfSpeech: 'n.', definition: '暴风雨', example: 'There is a storm coming.' },
      { word: 'rainbow', phonetic: '/ˈreɪnboʊ/', partOfSpeech: 'n.', definition: '彩虹', example: 'Look at the rainbow!' },
      { word: 'tree', phonetic: '/triː/', partOfSpeech: 'n.', definition: '树', example: 'There is a big tree in the yard.' },
      { word: 'flower', phonetic: '/ˈflaʊər/', partOfSpeech: 'n.', definition: '花', example: 'The flowers are beautiful.' },
      { word: 'grass', phonetic: '/ɡræs/', partOfSpeech: 'n.', definition: '草', example: 'The grass is green.' },
      { word: 'leaf', phonetic: '/liːf/', partOfSpeech: 'n.', definition: '叶子', example: 'Leaves fall in autumn.' },
      { word: 'river', phonetic: '/ˈrɪvər/', partOfSpeech: 'n.', definition: '河流', example: 'The river is very wide.' },
      { word: 'lake', phonetic: '/leɪk/', partOfSpeech: 'n.', definition: '湖泊', example: 'We swim in the lake.' },
      { word: 'mountain', phonetic: '/ˈmaʊntən/', partOfSpeech: 'n.', definition: '山', example: 'The mountain is very high.' },
      { word: 'hill', phonetic: '/hɪl/', partOfSpeech: 'n.', definition: '小山', example: 'We climbed the hill.' },
      { word: 'forest', phonetic: '/ˈfɔːrɪst/', partOfSpeech: 'n.', definition: '森林', example: 'There are many trees in the forest.' },
      { word: 'beach', phonetic: '/biːtʃ/', partOfSpeech: 'n.', definition: '海滩', example: 'We went to the beach.' },
    ]
  },
  {
    id: 'feelings',
    name: '情感与情绪',
    description: '表达情感和情绪的词汇',
    words: [
      { word: 'happy', phonetic: '/ˈhæpi/', partOfSpeech: 'adj.', definition: '快乐的，高兴的', example: 'I am very happy today.' },
      { word: 'sad', phonetic: '/sæd/', partOfSpeech: 'adj.', definition: '悲伤的', example: 'She looks sad.' },
      { word: 'angry', phonetic: '/ˈæŋɡri/', partOfSpeech: 'adj.', definition: '生气的', example: 'My father is angry.' },
      { word: 'tired', phonetic: '/ˈtaɪərd/', partOfSpeech: 'adj.', definition: '疲劳的，累的', example: 'I am very tired.' },
      { word: 'hungry', phonetic: '/ˈhʌŋɡri/', partOfSpeech: 'adj.', definition: '饥饿的', example: 'I am hungry.' },
      { word: 'thirsty', phonetic: '/ˈθɜːrsti/', partOfSpeech: 'adj.', definition: '口渴的', example: 'I am thirsty.' },
      { word: 'excited', phonetic: '/ɪkˈsaɪtɪd/', partOfSpeech: 'adj.', definition: '兴奋的', example: 'I am excited about the trip.' },
      { word: 'nervous', phonetic: '/ˈnɜːrvəs/', partOfSpeech: 'adj.', definition: '紧张的', example: 'I am nervous for the exam.' },
      { word: 'bored', phonetic: '/bɔːrd/', partOfSpeech: 'adj.', definition: '无聊的', example: 'I am bored.' },
      { word: 'surprised', phonetic: '/sərˈpraɪzd/', partOfSpeech: 'adj.', definition: '惊讶的', example: 'She looked surprised.' },
      { word: 'proud', phonetic: '/praʊd/', partOfSpeech: 'adj.', definition: '自豪的', example: 'I am proud of you.' },
      { word: 'shy', phonetic: '/ʃaɪ/', partOfSpeech: 'adj.', definition: '害羞的', example: 'She is very shy.' },
      { word: 'brave', phonetic: '/breɪv/', partOfSpeech: 'adj.', definition: '勇敢的', example: 'You are very brave.' },
      { word: 'kind', phonetic: '/kaɪnd/', partOfSpeech: 'adj.', definition: '友善的', example: 'My teacher is kind.' },
      { word: 'friendly', phonetic: '/ˈfrendli/', partOfSpeech: 'adj.', definition: '友好的', example: 'She is very friendly.' },
      { word: 'smart', phonetic: '/smɑːrt/', partOfSpeech: 'adj.', definition: '聪明的', example: 'He is very smart.' },
      { word: 'funny', phonetic: '/ˈfʌni/', partOfSpeech: 'adj.', definition: '有趣的，滑稽的', example: 'He is a funny boy.' },
      { word: 'beautiful', phonetic: '/ˈbjuːtɪfl/', partOfSpeech: 'adj.', definition: '美丽的', example: 'You look beautiful.' },
      { word: 'happy', phonetic: '/ˈhæpi/', partOfSpeech: 'adj.', definition: '快乐的', example: 'Happy birthday!' },
      { word: 'love', phonetic: '/lʌv/', partOfSpeech: 'n./v.', definition: '爱，喜欢', example: 'I love my family.' },
    ]
  },
];

export const wordMastery: Record<string, Record<string, number>> = {};
