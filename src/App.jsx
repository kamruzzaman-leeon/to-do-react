import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect } from 'react';

function App() {
  // const [count, setCount] = useState(0)
  const [tasks, setTasks] = useState([]);
  const [taskData, setTaskData] = useState('');
  const [priority, setPriority] = useState('low');

  const addTask = e => {
    e.preventDefault()
    console.log(e);

    const newTask = {
      id: tasks.length + 1, // Assuming each task has a unique ID
      name: taskData,
      priority: priority
    };

    // Update the tasks state array with the new task
    setTasks(prevTasks => [...prevTasks, newTask]);

    // Clear input fields after adding task
    setTaskData('');
    setPriority('low');

    //save the tasks to local storage
    localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]));
  };
  // Function to get tasks from local storage
  useEffect(() => {
    const getTasksFromLocalStorage = () => {
      const storedTasks = localStorage.getItem('tasks');
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    };

    //caall the function to fetch data from localstorage
    getTasksFromLocalStorage();
  }, [])

  const editTask = (id, data) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, name: data };
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }
  const deleteTask = (id) => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
  }

  const toggleComplete = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);

    // Update local storage with the updated tasks
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }
  return (

    <>
      <h1>To Do List</h1>
      <div className="card">
        <div>Total Task: {tasks.length}</div>
        <div>Complete Task:</div>
        <form onSubmit={addTask}>
          <input
            type="text"
            value={taskData}
            onChange={e => setTaskData(e.target.value)}
            placeholder="Add new task"
          />
          <select
            value={priority}
            onChange={e => setPriority(e.target.value)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button type="submit">Add</button>
        </form>
      </div>

      {/* Display tasks from state */}
      <div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Task</th>
              <th>Priority</th>
              <th colSpan={2} >Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr key={task.id}>
                <td>{index + 1}</td>
                <td><input type="text" defaultValue={task.name} onBlur={(e) => editTask(task.id, e.target.value)} /></td>
                <td>{task.priority}</td>
                <td>
                <button onClick={() => toggleComplete(task.id)} disabled={task.completed}>
    {task.completed ? 'Completed' : 'Complete'}
  </button>
                </td>
                <td>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App
