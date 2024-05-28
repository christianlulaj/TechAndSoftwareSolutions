import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
      : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';

  return (
    <nav className='bg-slate-700 border-b border-indigo-500 fixed w-full top-0 z-50'>
      <div className='flex h-20 items-center justify-between'>
        <div className='flex flex-1 items-center justify-center md:items-stretch md:justify-start'>
          <NavLink className='flex flex-shrink-0 items-center mr-4 mx-4' to='/'>
            <span className='hidden md:block text-white text-2xl font-bold ml-2'>
              Technical Solutions Inc.
            </span>
          </NavLink>
          <div className='md:ml-auto'>
            <div className='flex space-x-2'>
              <NavLink to='/' className={linkClass}>
                Home
              </NavLink>
              <NavLink to='/appointment' className={linkClass}>
                Appointment
              </NavLink>
              <NavLink to='/checkout' className={linkClass}>
                Checkout
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
