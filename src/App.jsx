import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)
  const [tasks,setTasks]=useState([]);
  const [taskData,setTaskData]=useState('');
  const [priority,setPriority]=useState('low');

  const addTask = e =>{
    e.preventDefault()
    console.log(e);

    const newTask = {
      id: tasks.length + 1, // Assuming each task has a unique ID
      name: taskData,
      priority: priority
    };

    // Update the tasks state array with the new task
    setTasks([...tasks, newTask]);

    // Clear input fields after adding task
    setTaskData('');
    setPriority('low');
  };
  
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
          <button type="submit">Add</button> {/* Changed onClick to onSubmit */}
        </form>
      </div>
    </>
  )
}

export default App
