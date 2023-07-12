import { Route, Routes } from 'react-router-dom';
import TaskPage from './pages/TaskPage';
import TaskForm from './pages/TaskForm';
import NotFound from './pages/NotFound';
import Navbar from './components/Nabvar';
import { ToasterProvider } from './providers/toast-provider.jsx';
import { TaskContextProvider } from './context/TaskContext';

function App() {
  return (
    <>
      <TaskContextProvider>
        <Navbar />
        <ToasterProvider />
        <Routes>
          <Route path='/' element={<TaskPage />} />
          <Route path='/new' element={<TaskForm />} />
          <Route path='/edit/:id' element={<TaskForm />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
      </TaskContextProvider>
    </>
  );
}

export default App;
