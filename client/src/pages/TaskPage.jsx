import { useEffect } from 'react';
import TaskCard from '../components/TaskCard';
import { useTasks } from '../context/TaskContext';

function TaskPage() {
  const { tasks, loadTasks } = useTasks();

  useEffect(() => {
    loadTasks();
  }, []);

  function renderMain() {
    if (tasks.length === 0) {
      return (
        <div className='mt-auto flex flex-col justify-center items-center h-screen'>
          <h1 className='text-4xl font-bold'>
            Empty | <b className='text-xl font-semibold'>Not Tasks</b>
          </h1>
        </div>
      );
    }

    return (
      <div className='grid grid-cols-3 gap-2'>
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>
    );
  }

  return (
    <div className='container m-auto'>
      <h1 className='text-3xl font-bold text-center text-white mt-5 mb-5'>
        Task List
      </h1>
      {renderMain()}
    </div>
  );
}

export default TaskPage;
