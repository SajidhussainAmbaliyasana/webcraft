import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react';


const LoginPage = lazy(() => import('../pages/LoginPage'));
const SignupPage = lazy(() => import('../pages/Signup'));
const Dashboard = lazy(() => import('../pages/Dashboard'));
const Website = lazy(() => import('../pages/Website'));
const Setting = lazy(() => import('../pages/Setting'));
const DashboardLayout = lazy(() => import('../layouts/DashboardLayout'));
import ProtectedRoutes from './ProtectedRoutes';

import LandingPage from '../pages/LandingPage'
import ExtraPage from '../pages/ExtraPage';
import Epage from '../pages/Epage';

const AppRoutes = () => {
  return (

    <BrowserRouter>
      <Suspense fallback={<h1>Loading...</h1>}>

        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />

          <Route element={<ProtectedRoutes />}>
            <Route path='/dashboard' element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />

              <Route path='websites' element={<Website />} />
              <Route path='settings' element={<Setting />} />


            </Route>
          </Route>

          <Route path='/e' element={<Epage />} />
          <Route path='/extra' element={<ExtraPage />} />


        </Routes>
      </Suspense>
    </BrowserRouter>

  )
}

export default AppRoutes;
