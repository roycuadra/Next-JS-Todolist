import { useState } from "react";
import styles from "../styles/TodoList.module.css";

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue.trim() === "") return;
    if (editIndex === -1) {
      // Add new task
      setTasks([...tasks, { title: inputValue, completed: false }]);
    } else {
      // Update existing task
      const newTasks = [...tasks];
      newTasks[editIndex].title = inputValue;
      setTasks(newTasks);
      setEditIndex(-1);
    }
    setInputValue("");
  };

  const handleDeleteTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleEditTask = (index) => {
    setInputValue(tasks[index].title);
    setEditIndex(index);
  };

  const handleToggleCompleted = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Todo List</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="Add a new task"
          value={inputValue}
          onChange={handleInputChange}
        />
        <button className={styles.button} type="submit">
          {editIndex === -1 ? "Add" : "Update"}
        </button>
      </form>
      <ul className={styles.list}>
        {tasks.map((task, index) => (
          <li
            key={index}
            className={task.completed ? styles.completed : styles.task}
          >
            <div>
              <input
                className={styles.checkbox}
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleCompleted(index)}
              />
              {task.title}
            </div>
            <div className={styles.actions}>
              <button
                className={styles.editButton}
                onClick={() => handleEditTask(index)}
              >
                Edit
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteTask(index)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
