require('dotenv').config({ path: './config.env' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Подключение к MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Импорт маршрутов через require — убедитесь, что в папке routes лежат файлы tasks.js, stories.js, projects.js, users.js
app.use('/api/tasks',    require('./routes/tasks'));
app.use('/api/stories',  require('./routes/stories'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/users',    require('./routes/users'));

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));