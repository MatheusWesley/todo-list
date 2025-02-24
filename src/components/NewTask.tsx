import { useState, FormEvent, ChangeEvent } from 'react';
import { PlusCircle } from '@phosphor-icons/react';
import styles from './NewTask.module.css';

export interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

interface NewTaskProps {
  addNewTask: (task: Task) => void;
}

export function NewTask({ addNewTask }: NewTaskProps) {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  function handleCreateTask(event: FormEvent) {
    event.preventDefault();

    if (newTaskTitle.trim() === '') {
      alert('Por favor, insira uma tarefa.');
      return;
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: newTaskTitle,
      isComplete: false,
    };

    addNewTask(newTask);

    setNewTaskTitle('');
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    setNewTaskTitle(event.target.value);
  }

  return (
    <div>
      <form onSubmit={handleCreateTask} className={styles.inputContainer}>
        <input
          type="text"
          value={newTaskTitle}
          onChange={handleNewTaskChange}
          placeholder="Adicione uma nova tarefa."
        />
        <button type="submit">
          Criar
          <PlusCircle />
        </button>
      </form>
    </div>
  );
}
