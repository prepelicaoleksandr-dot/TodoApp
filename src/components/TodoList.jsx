import React from 'react';
import TodoItem from './TodoItem';

/**
 * TodoList Component - Список всех задач
 * 
 * Функциональность:
 * - Отображение отфильтрованного списка задач
 * - Передача функций удаления и переключения выполнения в дочерние компоненты
 * - Анимация элементов списка
 */
const TodoList = ({ todos, onDeleteTodo, onToggleTodo }) => {
  return (
    <div className="todo-list">
      {todos.length > 0 ? (
        <ul className="todo-items">
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={onDeleteTodo}
              onToggle={onToggleTodo}
            />
          ))}
        </ul>
      ) : null}
    </div>
  );
};

export default TodoList;
