import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

/**
 * App Component - Главный компонент приложения
 * 
 * Отвечает за:
 * - Управление состоянием всех задач
 * - Управление текущим фильтром (Все/Активные/Выполненные)
 * - Сохранение и загрузку данных из localStorage
 * - Обработка операций добавления, удаления и редактирования задач
 */
const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  // Загружаем данные из localStorage при монтировании компонента
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error('Ошибка при загрузке задач:', error);
      }
    }
  }, []);

  // Сохраняем задачи в localStorage при каждом изменении
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  /**
   * Добавляет новую задачу
   * @param {string} title - Название задачи
   * @param {string} description - Описание задачи (опционально)
   */
  const addTodo = (title, description = '') => {
    const newTodo = {
      id: Date.now(), // Используем временную метку как уникальный ID
      title,
      description,
      completed: false,
      createdAt: new Date().toLocaleString('ru-RU')
    };
    setTodos([newTodo, ...todos]);
  };

  /**
   * Удаляет задачу по ID
   * @param {number} id - ID задачи для удаления
   */
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  /**
   * Переключает статус выполнения задачи
   * @param {number} id - ID задачи
   */
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  /**
   * Фильтрует список задач в зависимости от текущего фильтра
   */
  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();

  // Подсчитываем статистику
  const activeTodoCount = todos.filter(todo => !todo.completed).length;
  const completedTodoCount = todos.filter(todo => todo.completed).length;

  return (
    <div className="app">
      {/* Заголовок приложения */}
      <header className="app-header">
        <h1 className="app-title">📝 Todo App</h1>
        <p className="app-subtitle">Управляйте своими задачами эффективно</p>
      </header>

      {/* Основная область содержимого */}
      <main className="app-main">
        <div className="app-container">
          {/* Форма для добавления новых задач */}
          <TodoForm onAddTodo={addTodo} />

          {/* Статистика */}
          <div className="stats-container">
            <div className="stat">
              <span className="stat-label">Всего:</span>
              <span className="stat-value">{todos.length}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Активных:</span>
              <span className="stat-value active">{activeTodoCount}</span>
            </div>
            <div className="stat">
              <span className="stat-label">Выполнено:</span>
              <span className="stat-value completed">{completedTodoCount}</span>
            </div>
          </div>

          {/* Фильтры */}
          <div className="filters">
            <button
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              Все
            </button>
            <button
              className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Активные
            </button>
            <button
              className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Выполненные
            </button>
          </div>

          {/* Список задач */}
          <TodoList
            todos={filteredTodos}
            onDeleteTodo={deleteTodo}
            onToggleTodo={toggleTodo}
          />

          {/* Сообщение когда нет задач */}
          {filteredTodos.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">🎯</div>
              <p className="empty-state-text">
                {todos.length === 0
                  ? 'У вас нет задач. Создайте первую!'
                  : `Нет ${
                      filter === 'active' ? 'активных' : 'выполненных'
                    } задач`}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Подвал */}
      <footer className="app-footer">
        <p>© 2024 Todo App. Создано с ❤️ для управления задачами</p>
      </footer>
    </div>
  );
};

export default App;
