import {Outlet} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Login from '../../pages/Login';
import {selectCurrentUser} from './authSlice';

const RequireAuth = () => {
  const user = useSelector(selectCurrentUser);

  return user.authorizationToken ? <Outlet /> : <Login />;
};

export default RequireAuth;
