import { useState, FormEvent, ChangeEvent } from 'react';
import { PlusCircle } from '@phosphor-icons/react';
import styles from './NewTask.module.css';

export interface Task {
  id: string;
  title: string;
  isComplete: boolean;
}

export function NewTask() {
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

    console.log(newTask);

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
          value={newTaskTitle} // Estado controlado para o título
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
