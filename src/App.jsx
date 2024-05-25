import {Routes, Route} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Otp from './pages/Otp';
import Layout from './components/Layout';
import RequireAuth from './features/auth/RequireAuth';
import NotFound from './components/NotFound';
import NoAuth from './features/auth/NoAuth';
import useFetchUserData from './hooks/useFetchUserData';
import Home from './components/Home';
import Loader from './components/Loader';
import {useGetTodosQuery} from './api/auth/todoApiSlice';
import {selectCurrentUser} from './features/auth/authSlice';
import {useSelector} from 'react-redux';

function App() {
  const loading = useFetchUserData();
  const user = useSelector(selectCurrentUser);
  useGetTodosQuery(undefined, {skip: !loading && !user.authorizationToken});

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route element={<NoAuth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="otp" element={<Otp />} />
        </Route>

        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
