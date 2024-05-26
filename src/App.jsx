import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import AppointmentPage from './pages/AppointmentPage';
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage';
import CheckOutPage from './pages/CheckOutPage';
const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path='/appointmnet' element={<AppointmentPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/checkout' element={<CheckOutPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};
export default App;
