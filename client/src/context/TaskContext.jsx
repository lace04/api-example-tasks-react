import { createContext, useContext, useState } from 'react';
import {
  getTasksRequest,
  getTaskRequest,
  deleteTaskRequest,
  createTaskRequest,
  updateTaskRequest,
  toggleTaskDoneRequest,
} from '../api/task-api';
import { toast } from 'react-hot-toast';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

export const TaskContext = createContext();

export const useTasks = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTasks must be used within a TaskContextProvider');
  }

  if (context === undefined)
    throw new Error('useTasks must be used within a TaskContextProvider');

  return context;
};

export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  async function loadTasks() {
    const response = await getTasksRequest();
    setTasks(response.data);
  }

  const deleteTask = async (id) => {
    confirmAlert({
      className: 'bg-zinc-900',
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this task?',
      buttons: [
        {
          label: 'Yes',
          className: 'hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
          onClick: async () => {
            try {
              const response = await deleteTaskRequest(id);
              setTasks(tasks.filter((task) => task.id !== id));
              toast.success('Task deleted');
            } catch (error) {
              console.log(error);
              toast.error('Error deleting task');
            }
          },
        },
        {
          label: 'No',
          className: 'hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
          onClick: () => {},
        },
      ],
    });
  };

  const createTask = async (task) => {
    try {
      const response = await createTaskRequest(task);
      // console.log(response);
      //setTasks([...tasks, response.data]);
      toast.success('Task created');
    } catch (error) {
      console.log(error);
      toast.error('Error creating task');
    }
  };

  const getTask = async (id) => {
    try {
      const response = await getTaskRequest(id);
      return response.data;
      // console.log(response);
    } catch (error) {
      console.log(error);
      toast.error('Error getting task');
    }
  };

  const updateTask = async (id, newFields) => {
    try {
      const response = await updateTaskRequest(id, newFields);
      console.log(response);
      toast.success('Task updated');
    } catch (error) {
      console.log(error);
      toast.error('Error updating task');
    }
  };

  const toogleTaskDone = async (id, done) => {
    try {
      const taskFound = tasks.find((task) => task.id === id);
      await toggleTaskDoneRequest(id, taskFound.done === 0 ? 1 : 0);
      tasks.map((task) =>
        task.id === id ? (task.done = task.done === 0 ? 1 : 0) : task.done
      );
      setTasks([...tasks]);
      toast.success('Task updated');
    } catch (error) {
      console.log(error);
      toast.error('Error updating task');
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loadTasks,
        deleteTask,
        createTask,
        getTask,
        updateTask,
        toogleTaskDone,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;
