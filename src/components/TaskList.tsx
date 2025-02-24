import styles from './TaskList.module.css';

import Clipboard from '../assets/clipboard.svg';
import { Trash } from '@phosphor-icons/react';
import { useState } from 'react';
import { NewTask, Task } from './NewTask';

export function TaskList() {

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 'f29200d8-2a97-40c7-a6ed-010b6bd5f596',
      title: 'Concluir o Desafio da Rocketseat',
      isComplete: false,
    },
    {
      id: 'dc351892-9fce-4e54-afae-0d39b5cddba3',
      title: 'Estudar ReactJS',
      isComplete: true,
    },
    {
      id: 'dc351892-9fce-4e54-afae-0d39b5c33ba3',
      title: 'Estudar TypeScript',
      isComplete: false,
    },
  ]);

  function handleCheckboxChange(id: string) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isComplete: !task.isComplete } : task
      )
    );
  }

  function addNewTask(task: Task) {
    setTasks((prevTasks) => [...prevTasks, task]);
  }

  function deleteTask(id: string) {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== id)
    );
  }

  const taskIsEmpty = tasks.length === 0;

  return (
    <div>
      <NewTask addNewTask={addNewTask} />
      <div className={styles.container}>
        <div className={styles.header}>
          <p>Tarefas criadas <span>{tasks.length}</span></p>
          <p>Concluídas <span>{tasks.filter(task => task.isComplete).length} de {tasks.length}</span></p>

        </div>
        {taskIsEmpty ? (
          <div className={styles.empty}>
            <img src={Clipboard} />
            <strong>Você ainda não tem tarefas cadastradas</strong>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        ) : (
          <div>
            {tasks.map(task => {
              return (
                <div className={styles.content} key={task.id}>
                  <div className={styles.task}>
                    <input
                      id={task.id}
                      type="checkbox"
                      checked={task.isComplete}
                      onChange={() => handleCheckboxChange(task.id)}
                    />
                    <label htmlFor={task.id}>{task.title}</label>
                  </div>
                  {/* Botão para deletar uma tarefa */}
                  <button onClick={() => deleteTask(task.id)} className={styles.action}>
                    <Trash />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}