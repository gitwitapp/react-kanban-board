import React, { useState } from 'react'
import { AiOutlineArrowRight, AiOutlineCheck } from 'react-icons/ai'
import { BsArrowRepeat, BsTrash, BsTrashFill } from 'react-icons/bs'

import './tailwind-config.js'

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Task 1', status: 'todo' },
    { id: 2, title: 'Task 2', status: 'todo' },
    { id: 3, title: 'Task 3', status: 'in-progress' },
    { id: 4, title: 'Task 4', status: 'done' },
  ])
  const [newTask, setNewTask] = useState('')
  const [taskId, setTaskId] = useState(5) 

  const moveTask = (taskId, newStatus) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, status: newStatus }
        } else {
          return task
        }
      })
    })
  }

  const deleteTask = (taskId) => {
    setTasks((prevTasks) => {
      return prevTasks.filter((task) => task.id !== taskId)
    })
  }

  const addTask = () => {
    if (newTask.trim() !== '') {
      const newTaskObj = {
        id: taskId,
        title: newTask,
        status: 'todo',
      }
      setTaskId((prevId) => prevId + 1) 
      setTasks((prevTasks) => [...prevTasks, newTaskObj])
      setNewTask('')
    }
  }

  const clearAllTasks = () => {
    setTasks([])
    setTaskId(1)
    setNewTask('')
  }

  return (
    <div className="p-2">
      <h1 className="text-3xl font-extrabold tracking-tight lg:text-4xl">
        My React App
      </h1>

      <div className="flex mt-4">
        <div className="flex-1 p-4 bg-gray-100 rounded-lg mr-2">
          <h2 className="text-lg font-semibold mb-4">To Do</h2>
          {tasks
            .filter((task) => task.status === 'todo')
            .map((task) => (
              <div
                key={task.id}
                className="p-2 bg-white rounded shadow mb-2"
              >
                <p>{task.title}</p>
                <button
                  className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded"
                  onClick={() => moveTask(task.id, 'in-progress')}
                >
                  <AiOutlineArrowRight className="mr-1" />
                </button>
              </div>
            ))}
        </div>

        <div className="flex-1 p-4 bg-gray-100 rounded-lg mr-2">
          <h2 className="text-lg font-semibold mb-4">In Progress</h2>
          {tasks
            .filter((task) => task.status === 'in-progress')
            .map((task) => (
              <div
                key={task.id}
                className="p-2 bg-white rounded shadow mb-2"
              >
                <p>{task.title}</p>
                <button
                  className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded"
                  onClick={() => moveTask(task.id, 'done')}
                >
                  <AiOutlineCheck className="mr-1" />
                </button>
              </div>
            ))}
        </div>

        <div className="flex-1 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Done</h2>
          {tasks
            .filter((task) => task.status === 'done')
            .map((task) => (
              <div
                key={task.id}
                className="p-2 bg-white rounded shadow mb-2"
              >
                <p>{task.title}</p>
                <button
                  className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded mr-2"
                  onClick={() => moveTask(task.id, 'todo')}
                >
                  <BsArrowRepeat className="mr-1" />
                </button>
                <button
                  className="mt-2 bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded"
                  onClick={() => deleteTask(task.id)}
                >
                  <BsTrash className="mr-1" />
                </button>
              </div>
            ))}
        </div>
      </div>

      <div className="mt-4">
        <input
          type="text"
          className="px-3 py-2 border border-gray-300 rounded shadow-sm w-64 mr-2"
          placeholder="New Task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
          onClick={addTask}
        >
          Add Task
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded ml-2"
          onClick={clearAllTasks}
        >
          <BsTrashFill className="mr-1" />
        </button>
      </div>
    </div>
 )
}