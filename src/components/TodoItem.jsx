import React, { useState } from 'react';

/**
 * TodoItem Component - Одна задача в списке
 * 
 * Функциональность:
 * - Отображение информации о задаче
 * - Кнопка для отметки выполнения
 * - Кнопка для удаления с подтверждением
 * - Отображение времени создания
 * - Плавные анимации при удалении
 */
const TodoItem = ({ todo, onDelete, onToggle }) => {
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * Обработчик удаления с анимацией
   * Сначала показываем анимацию, затем удаляем
   */
  const handleDelete = () => {
    // Добавляем класс анимации удаления
    setIsDeleting(true);
    
    // Ждем завершения анимации (300ms) перед удалением
    setTimeout(() => {
      onDelete(todo.id);
    }, 300);
  };

  return (
    <li className={`todo-item ${isDeleting ? 'deleting' : ''} ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-item-content">
        {/* Чекбокс для отметки выполнения */}
        <input
          type="checkbox"
          className="todo-checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          aria-label={`Отметить задачу "${todo.title}" как ${todo.completed ? 'невыполненную' : 'выполненную'}`}
        />

        {/* Информация о задаче */}
        <div className="todo-info">
          <h3 className="todo-title">{todo.title}</h3>
          
          {/* Описание (если оно есть) */}
          {todo.description && (
            <p className="todo-description">{todo.description}</p>
          )}
          
          {/* Дата создания */}
          <span className="todo-date">Создано: {todo.createdAt}</span>
        </div>
      </div>

      {/* Кнопки действий */}
      <div className="todo-actions">
        <button
          className="btn-complete"
          onClick={() => onToggle(todo.id)}
          title={todo.completed ? 'Отметить как невыполненную' : 'Отметить как выполненную'}
        >
          {todo.completed ? '✓' : '○'}
        </button>
        
        <button
          className="btn-delete"
          onClick={handleDelete}
          title="Удалить задачу"
        >
          🗑️
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
