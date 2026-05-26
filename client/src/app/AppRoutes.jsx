import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {lazy,Suspense} from 'react';

// const LandingPage = lazy(()=> import("../pages/LandingPage"));
const LoginPage = lazy(()=> import('../pages/LoginPage'));
const SignupPage = lazy(()=> import('../pages/Signup'));
const Dashboard = lazy(()=> import('../pages/Dashboard'));


import LandingPage from '../pages/LandingPage'
import ExtraPage from '../pages/ExtraPage';
import Epage from '../pages/Epage';

const AppRoutes = () => {
  return (
    
    <BrowserRouter>
      <Suspense fallback={<h1>Loading...</h1>}>

      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/signup' element={<SignupPage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>

        <Route path='/e' element={<Epage/>}/>
        <Route path='/extra' element={<ExtraPage/>}/>
        

      </Routes>
      </Suspense>
    </BrowserRouter>
    
  )
}

export default AppRoutes;
