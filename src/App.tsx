// hosts routes

// hooks
import { Routes, Route } from 'react-router-dom';
// auth
import './globals.css';
import AuthLayout from './_auth/AuthLayout';
import SigninForm from './_auth/forms/SigninForm';
import SignupForm from './_auth/forms/SignupForm';
// root
import { RootLayout } from './_root/pages/RootLayout';
import { Home } from './_root/pages';

const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
      {/* public routes */}
        <Route element={<AuthLayout/>}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>
      
      {/* private routes */}
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />      
        </Route>
      </Routes>
  </main>
  )
}

export default App