'use client';

// import logo from "./logo.png";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='flex justify-between bg-zinc-800 p-4 text-white'>
      <div>
        <Link to='/' className='mr-4'>
          Home
        </Link>
        <Link to='/new' className='mr-4'>
          Create Task
        </Link>
      </div>
      <Link to='*' className='mr-4'>
        Not Found
      </Link>
      {/* <div>
        <img src={logo} alt="Logo" className="w-20 h-10" />
      </div> */}
    </div>
  );
};

export default Navbar;
