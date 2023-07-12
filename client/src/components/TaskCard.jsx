import { useTasks } from '../context/TaskContext';
import { useNavigate } from 'react-router-dom';

function TaskCard({ task }) {
  const { deleteTask, toogleTaskDone } = useTasks();
  const navigate = useNavigate();

  const handleDone = async () => {
    await toogleTaskDone(task.id);
  };

  return (
    <div className='bg-zinc-800 rounded-md p-4'>
      <header className='flex justify-between'>
        <h2 className='text-xl font-bold text-center text-white mt-5 sm:text-center'>
          {task.title}
        </h2>
        <span>{task.done == 1 ? '✔️' : '❌'}</span>
      </header>

      <p className='text-base font-semibold text-white mt-5'>
        {task.description}
      </p>
      <div className='flex gap-x-1 justify-end'>
        <button
          className='bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 text-xs rounded sm:py-1 sm:px-1 sm:text-xs'
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
        <button
          className='bg-zinc-500 hover:bg-zinc-600 text-white font-bold py-1 px-2 text-xs rounded sm:py-1 sm:px-1 sm:text-xs'
          onClick={() => navigate(`/edit/${task.id}`)}
        >
          Edit
        </button>
        <button
          className='bg-zinc-500 hover:bg-zinc-600 text-white font-bold py-1 px-2 text-xs rounded sm:py-1 sm:px-1 sm:text-xs'
          onClick={() => handleDone(task.done)}
        >
          Toogle Task
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
