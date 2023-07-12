import { Formik, Form } from 'formik';

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';

function TaskForm() {
  const { createTask, getTask, updateTask } = useTasks();
  const [task, setTask] = useState({
    title: '',
    description: '',
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        // console.log(task);
        setTask({
          title: task.title,
          description: task.description,
        });
      }
    };
    loadTask();
  }, []);

  return (
    <div className='flex justify-center items-center h-full'>
      <div className='w-full max-w-md'>
        <h1 className='text-2xl font-bold text-white m-5 text-center'>
          {params.id ? 'Edit Task' : 'Create Task'}
        </h1>
        <Formik
          initialValues={task}
          enableReinitialize={true}
          onSubmit={async (values, actions) => {
            // console.log(values);
            if (params.id) {
              await updateTask(params.id, values);
            } else {
              await createTask(values);
            }
            navigate('/');
            setTask({
              title: '',
              description: '',
            });
          }}
        >
          {({ handleChange, handleSubmit, values, isSubmitting }) => (
            <Form onSubmit={handleSubmit} className='bg-zinc-800 rounded-md p-4'>
              <label className='text-white font-bold text-xl mb-2 block w-full'>
                Title
              </label>
              <input
                type='text'
                name='title'
                placeholder='Write a title'
                onChange={handleChange}
                className='text-white bg-zinc-700 py-2 px-3 rounded-md w-full'
                value={values.title}
              />

              <label className='text-white font-bold text-xl mb-2 mt-4 block'>
                Description
              </label>
              <textarea
                name='description'
                rows={3}
                placeholder='Write Description'
                onChange={handleChange}
                className='text-white bg-zinc-700 py-2 px-3 rounded-md w-full'
                value={values.description}
              />

              <button
                type='submit'
                disabled={isSubmitting || !values.title || !values.description}
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block w-full mt-4 ${
                  isSubmitting || !values.title || !values.description
                    ? 'cursor-not-allowed'
                    : ''
                }`}
              >
                {isSubmitting
                  ? 'Loading...'
                  : params.id
                  ? 'Update Task'
                  : 'Create Task'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default TaskForm;
