import React, { useState } from 'react';

/**
 * TodoForm Component - Форма для добавления новых задач
 *
 * Функциональность:
 * - Ввод названия задачи (обязательное поле)
 * - Ввод описания задачи (опционально)
 * - Валидация формы
 * - Очистка полей после добавления
 * - Оптимистичная обратная связь пользователю
 */
const TodoForm = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  /**
   * Обработчик отправки формы
   * Валидирует данные и добавляет новую задачу
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Очищаем предыдущие сообщения об ошибках
    setError('');

    // Валидация: название не должно быть пустым
    if (!title.trim()) {
      setError('Пожалуйста, введите название задачи');
      return;
    }

    // Валидация: максимальная длина
    if (title.length > 100) {
      setError('Название задачи не должно быть длиннее 100 символов');
      return;
    }

    // Добавляем задачу через функцию из папы компонент
    onAddTodo(title.trim(), description.trim());

    // Очищаем форму
    setTitle('');
    setDescription('');
    setIsSubmitted(true);

    // Убираем сообщение об успехе через 2 секунды
    setTimeout(() => setIsSubmitted(false), 2000);
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="form-input"
          placeholder="Введите название задачи..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError(''); // Убираем ошибку при вводе
          }}
          maxLength="100"
        />
        <span className="char-count">{title.length}/100</span>
      </div>

      <div className="form-group">
        <textarea
          className="form-textarea"
          placeholder="Добавьте описание (опционально)..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          maxLength="500"
          rows="3"
        />
        <span className="char-count">{description.length}/500</span>
      </div>

      {/* Сообщение об ошибке */}
      {error && <div className="form-error">{error}</div>}

      {/* Сообщение об успехе */}
      {isSubmitted && (
        <div className="form-success">✓ Задача добавлена успешно!</div>
      )}

      <button type="submit" className="form-submit">
        + Добавить задачу
      </button>
    </form>
  );
};

export default TodoForm;
