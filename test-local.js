// 로컬 테스트용 간단한 서버
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// 메모리에 저장할 todos
let todos = [];
let idCounter = 1;

// 미들웨어 설정
app.use(express.json());
app.use(express.static('public'));

// 뷰 엔진 설정
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// 메인 페이지
app.get('/', (req, res) => {
  res.render('index', { message: 'Todo List App' });
});

// API 라우트들
app.get('/todos', (req, res) => {
  res.json(todos);
});

app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  res.json(todo);
});

app.post('/todos', (req, res) => {
  const { title, description } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  
  const todo = {
    id: idCounter++,
    title,
    description: description || '',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  todos.push(todo);
  res.status(201).json(todo);
});

app.patch('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  const { title, description, completed } = req.body;
  const todo = todos[todoIndex];
  
  if (title !== undefined) todo.title = title;
  if (description !== undefined) todo.description = description;
  if (completed !== undefined) todo.completed = completed;
  todo.updatedAt = new Date();
  
  todos[todoIndex] = todo;
  res.json(todo);
});

app.delete('/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(t => t.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }
  
  todos.splice(todoIndex, 1);
  res.status(204).send();
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log('📝 Todo List App is ready!');
});

module.exports = app;